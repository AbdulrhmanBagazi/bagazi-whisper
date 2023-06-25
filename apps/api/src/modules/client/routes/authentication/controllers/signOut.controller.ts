import { Request, Response } from 'express';

const SignOut = (_req: Request, res: Response) => {
  try {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');

    return res.status(200).send(true);
  } catch (e: unknown) {
    return res.sendStatus(500);
  }
};

export default SignOut;
