import express, { Application } from 'express';
import { Authenticate, Refresh, SignIn, SignOut } from './index.controllers';
import { validateBody, Schema } from './index.validators';
//passport
import {
  Admin_PassportSignIn,
  //   PassportAuthenticate,
  Admin_PassportRefresh,
  Admin_PassportAuthenticateRest,
} from '../passport/index.passport';

const app: Application = express();

app.get('/', Admin_PassportAuthenticateRest, Authenticate);
app.get('/refresh', Admin_PassportRefresh, Refresh);
app.post('/signin', validateBody(Schema.SignInSchema), Admin_PassportSignIn, SignIn);
app.get('/signout', SignOut);

export default app;
