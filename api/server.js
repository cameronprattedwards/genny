import express from 'express';
import auth from './auth';
import state from './state';
import steps from './steps';

const app = express();

app.use('/', auth);
app.use('/', state);
app.use('/', steps);

export default app;
