import express from 'express';
import auth from './auth';
import state from './state';
import steps from './steps';
import setup from './setup';

const app = express();

app.use('/', auth);
app.use('/', state);
app.use('/', steps);
app.use('/', setup);

export default app;
