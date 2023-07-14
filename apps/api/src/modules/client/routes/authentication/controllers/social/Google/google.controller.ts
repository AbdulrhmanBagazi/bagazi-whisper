import { Prisma, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { OAuth2Client } from 'google-auth-library'
import { SendEmail, SignToken } from '../../../index.utils'
import { UserSelect } from '../../../config'
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const prisma = new PrismaClient()

const GoogleSignIn = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.CLIENT_ID
    })
    const GoogleUser = ticket.getPayload()
    const now = new Date()

    const user = await prisma.user.findFirst({
      where: {
        // accountId: GoogleUser?.sub,
        // type: 'GOOGLE'
        email: GoogleUser?.email
      },
      select: UserSelect
    })

    if (user) {
      if (user.type === 'GOOGLE' && user.accountId === GoogleUser?.sub) {
        const AccessToken = await SignToken(user, 'access_token')
        const RefreshToken = await SignToken(user, 'refresh_token')

        res.cookie('refresh_token', RefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 365 * 24 * 60 * 60 * 1000,
          signed: true
        })

        res.cookie('access_token', AccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 365 * 24 * 60 * 60 * 1000,
          signed: true
        })

        return res.status(200).send({
          user: user
        })
      }

      return res.status(400).send('Apple_Account')
    }

    if (!user && GoogleUser?.email) {
      const newUser = await prisma.user.create({
        data: {
          email: GoogleUser?.email.toLowerCase(),
          verfied: GoogleUser?.email_verified,
          verificationEmail: now,
          type: 'GOOGLE',
          accountId: GoogleUser?.sub
        },
        select: UserSelect
      })

      const AccessToken = await SignToken(newUser, 'access_token')
      const RefreshToken = await SignToken(newUser, 'refresh_token')

      res.cookie('refresh_token', RefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 365 * 24 * 60 * 60 * 1000,
        signed: true
      })

      res.cookie('access_token', AccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 365 * 24 * 60 * 60 * 1000,
        signed: true
      })

      // if (!GoogleUser?.email_verified) {
      //   await SendEmail(newUser.id, newUser.email)
      // }

      return res.status(200).send({
        user: newUser
      })
    }

    return res.sendStatus(400)
  } catch (e: unknown) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return res.status(400).send({ error: `${e.code}`, meta: e.meta })
      }

      return res.status(400).send({ error: `${e.code}`, meta: e.meta })
    }
    return res.sendStatus(500)
  }
}

export default GoogleSignIn
