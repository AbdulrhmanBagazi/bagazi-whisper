import express, { Application } from 'express';
const app: Application = express();
//routes
import Authentication from '../modules/client/routes/authentication/routes';

app.use('/authentication', Authentication);

export default app;
