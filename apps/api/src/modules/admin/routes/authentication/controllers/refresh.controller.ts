import { Request, Response } from 'express'
import { SignToken } from '../index.utils'

const Refresh = async (req: Request, res: Response) => {
  try {
    const admin = req.user

    const AccessToken = await SignToken(admin, 'admin_access_token')

    res.cookie('admin_access_token', AccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      signed: true
    })

    // return res.status(200).send({ admin: admin });
    return res.status(200).send(true)
  } catch (e: unknown) {
    return res.sendStatus(401)
  }
}

export default Refresh
