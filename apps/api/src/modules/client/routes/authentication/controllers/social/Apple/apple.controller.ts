import { Prisma, PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import appleSigninAuth from 'apple-signin-auth'
import crypto from 'crypto'
import { SignToken } from '../../../index.utils'
import { UserSelect } from '../../../config'

const prisma = new PrismaClient()

const AppleSignIn = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const appleIdTokenClaims = await appleSigninAuth.verifyIdToken(
      data.identityToken,
      {
        nonce: data.nonce
          ? crypto.createHash('sha256').update(data.nonce).digest('hex')
          : undefined
      }
    )

    const user = await prisma.user.findFirst({
      where: {
        // accountId: appleIdTokenClaims?.sub,
        // type: 'APPLE'
        email: appleIdTokenClaims.email
      },
      select: UserSelect
    })

    if (user) {
      if (user.apple && user.appleaccountId === appleIdTokenClaims?.sub) {
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

        return res.status(200).send({ user: user })
      } else {
        const updateUser = await prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            verfied: appleIdTokenClaims?.email_verified === 'true',
            apple: true,
            appleaccountId: appleIdTokenClaims?.sub,
            appleId: data.appleId
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

        return res.status(200).send({ user: updateUser })
      }
    }

    if (!user && appleIdTokenClaims?.email) {
      const newUser = await prisma.user.create({
        data: {
          email: appleIdTokenClaims?.email.toLowerCase(),
          verfied: appleIdTokenClaims?.email_verified === 'true',
          apple: true,
          appleaccountId: appleIdTokenClaims?.sub,
          appleId: data.appleId
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

      // if (!appleIdTokenClaims?.email_verified) {
      //   await SendEmail(newUser.id, newUser.email)
      // }

      return res.status(200).send({ user: newUser })
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

export default AppleSignIn
