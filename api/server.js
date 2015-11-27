import express from 'express';
import auth from './auth';
import state from './state';

const app = express();

app.use('/', auth);
app.use('/', state);

export default app;
