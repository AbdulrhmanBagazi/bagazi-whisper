import { Request, Response } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'
import { SignToken, HashPassword, SendEmail } from '../index.utils'

const prisma = new PrismaClient()

const SignUp = async (req: Request, res: Response) => {
  try {
    const { email, password }: Prisma.UserCreateInput = req.body
    const now = new Date()
    const hash = await HashPassword(password)
    const User = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hash,
        verificationEmail: now
      },
      select: {
        id: true,
        email: true,
        verfied: true,
        type: true,
        verificationEmail: true,
        Profile: true
      }
    })

    const AccessToken = await SignToken(User, 'access_token')
    const RefreshToken = await SignToken(User, 'refresh_token')

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

    await SendEmail(User.id, User.email)

    return res.status(200).send({
      user: {
        id: User.id,
        email: User.email,
        verfied: User.verfied,
        type: User.type,
        verificationEmail: User.verificationEmail,
        Profile: User.Profile
      }
    })
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

export default SignUp
