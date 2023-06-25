import passport from 'passport'
import './passport.admin'

const Admin_PassportSignIn = passport.authenticate('Admin_SingIn', {
  session: false
})
const Admin_PassportAuthenticate = passport.authenticate(
  'Admin_Authenticate_Access_Token',
  {
    session: false
  }
)
const Admin_PassportAuthenticateRest = passport.authenticate(
  'Admin_Authenticate_Access_Token_Rest',
  {
    session: false
  }
)
const Admin_PassportRefresh = passport.authenticate(
  'Admin_Authenticate_Refresh_Token',
  { session: false }
)

export {
  Admin_PassportSignIn,
  Admin_PassportAuthenticate,
  Admin_PassportRefresh,
  Admin_PassportAuthenticateRest
}
