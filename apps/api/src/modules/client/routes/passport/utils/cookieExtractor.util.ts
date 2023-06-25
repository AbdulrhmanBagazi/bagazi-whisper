import { Request } from 'express';

type Token_Type = 'access_token' | 'refresh_token';

export const CookieExtractor = function (req: Request, type: Token_Type) {
  let token = null;

  if (req && req.signedCookies && req.signedCookies.access_token && type === 'access_token') {
    token = req.signedCookies.access_token;
  }

  if (req && req.signedCookies && req.signedCookies.refresh_token && type === 'refresh_token') {
    token = req.signedCookies.refresh_token;
  }

  return token;
};
