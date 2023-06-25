import { Request, Response } from 'express'

const Authenticate = async (req: Request, res: Response) => {
  try {
    const user = req.user

    return res.status(200).send({
      user: {
        id: user.id,
        email: user.email,
        verfied: user.verfied,
        type: user.type,
        Profile: user.Profile,
        verificationEmail: user.verificationEmail,
        appleId: user?.appleId
      }
    })
  } catch (e: unknown) {
    return res.sendStatus(500)
  }
}

export default Authenticate
