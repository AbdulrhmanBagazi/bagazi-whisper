import { Request, Response } from 'express'

const Authenticate = async (req: Request, res: Response) => {
  try {
    // const admin = req.user

    return res.status(200).send(true)
  } catch (e: unknown) {
    return res.sendStatus(500)
  }
}

export default Authenticate
