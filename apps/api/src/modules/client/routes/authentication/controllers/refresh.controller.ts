import { Request, Response } from 'express';
import { SignToken } from '../index.utils';

const Refresh = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    const AccessToken = await SignToken(user, 'access_token');

    res.cookie('access_token', AccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 365 * 24 * 60 * 60 * 1000,
      signed: true,
    });

    return res.status(200).send({ user: user });
  } catch (e: unknown) {
    return res.sendStatus(401);
  }
};

export default Refresh;
