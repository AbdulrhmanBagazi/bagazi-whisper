import { Request } from 'express'

type Token_Type = 'admin_access_token' | 'admin_refresh_token'

export const CookieExtractor = function (req: Request, type: Token_Type) {
  let token = null

  if (
    req &&
    req.signedCookies &&
    req.signedCookies.admin_access_token &&
    type === 'admin_access_token'
  ) {
    token = req.signedCookies.admin_access_token
  }

  if (
    req &&
    req.signedCookies &&
    req.signedCookies.admin_refresh_token &&
    type === 'admin_refresh_token'
  ) {
    token = req.signedCookies.admin_refresh_token
  }

  return token
}
