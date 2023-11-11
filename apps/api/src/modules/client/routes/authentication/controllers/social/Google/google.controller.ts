import { Prisma, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { OAuth2Client } from 'google-auth-library'
import { SignToken } from '../../../index.utils'
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

    const user = await prisma.user.findFirst({
      where: {
        // accountId: GoogleUser?.sub,
        // type: 'GOOGLE'
        email: GoogleUser?.email
      },
      select: UserSelect
    })

    if (user) {
      if (user.google && user.googleaccountId === GoogleUser?.sub) {
        const AccessToken = await SignToken(
          { id: user.id, email: user.email },
          'access_token'
        )
        const RefreshToken = await SignToken(
          { id: user.id, email: user.email },
          'refresh_token'
        )
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
      } else {
        const updateUser = await prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            verfied: GoogleUser?.email_verified,
            google: true,
            googleaccountId: GoogleUser?.sub
          },
          select: UserSelect
        })

        const AccessToken = await SignToken(
          { id: updateUser.id, email: updateUser.email },
          'access_token'
        )
        const RefreshToken = await SignToken(
          { id: updateUser.id, email: updateUser.email },
          'refresh_token'
        )
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
          user: updateUser
        })
      }
    }

    if (!user && GoogleUser?.email) {
      const newUser = await prisma.user.create({
        data: {
          email: GoogleUser?.email.toLowerCase(),
          verfied: GoogleUser?.email_verified,
          google: true,
          googleaccountId: GoogleUser?.sub
        },
        select: UserSelect
      })

      const AccessToken = await SignToken(
        { id: newUser.id, email: newUser.email },
        'access_token'
      )
      const RefreshToken = await SignToken(
        { id: newUser.id, email: newUser.email },
        'refresh_token'
      )
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
    console.log(e)
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
