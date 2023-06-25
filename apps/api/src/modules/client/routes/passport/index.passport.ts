import passport from 'passport';
import './passport.user';

const Client_PassportSignIn = passport.authenticate('Client_SingIn', { session: false });
const Client_PassportAuthenticate = passport.authenticate('Client_Authenticate_Access_Token', { session: false });
const Client_PassportRefresh = passport.authenticate('Client_Authenticate_Refresh_Token', { session: false });
const Client_PassportVerifyEmail = passport.authenticate('Client_Verify_Email', { session: false });

export { Client_PassportSignIn, Client_PassportAuthenticate, Client_PassportRefresh, Client_PassportVerifyEmail };
