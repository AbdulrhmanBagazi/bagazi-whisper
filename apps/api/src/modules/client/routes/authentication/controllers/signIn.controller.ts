import { Request, Response } from 'express'
import { SignToken } from '../index.utils'

const SignIn = async (req: Request, res: Response) => {
  try {
    const user = req.user
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
      user: {
        id: user.id,
        email: user.email,
        verfied: user.verfied,
        type: user.type,
        Profile: user.Profile,
        verificationEmail: user.verificationEmail
      }
    })
  } catch (e: unknown) {
    return res.sendStatus(500)
  }
}

export default SignIn
