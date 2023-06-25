import express, { Application } from 'express';
import {
  Authenticate,
  Refresh,
  SignIn,
  SignOut,
  SignUp,
  VerifyEmail,
  SendNewVerificationEmail,
  GoogleSignIn,
  AppleSignIn,
} from './index.controllers';
import { validateBody, Schema } from './index.validators';
//passport
import {
  Client_PassportSignIn,
  Client_PassportAuthenticate,
  Client_PassportRefresh,
  Client_PassportVerifyEmail,
} from '../passport/index.passport';

const app: Application = express();

app.get('/', Client_PassportAuthenticate, Authenticate);
app.post('/signup', validateBody(Schema.SignUpSchema), SignUp);
app.get('/refresh', Client_PassportRefresh, Refresh);
app.post('/signin', validateBody(Schema.SignInSchema), Client_PassportSignIn, SignIn);
app.get('/verifyemail', Client_PassportVerifyEmail, VerifyEmail);
app.get('/sendverifyemail', Client_PassportAuthenticate, SendNewVerificationEmail);
app.get('/signout', SignOut);
app.post('/google', GoogleSignIn);
app.post('/apple', AppleSignIn);

export default app;
