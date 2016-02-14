import express from 'express';
import cookieParser from 'cookie-parser';

import apiPaths from '../paths';

import {login} from './login';
import {callback} from './callback';

const app = express();

app.use(cookieParser());

app.get(apiPaths.Paths.LOGIN, login);

app.get(apiPaths.Paths.CALLBACK, callback);  // eslint-disable-line no-undef

export default app;
