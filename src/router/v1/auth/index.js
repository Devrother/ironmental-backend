import express from 'express';
import { handleExceptions } from 'middlewares';
import * as authCtrl from './auth.ctrl';

const auth = express.Router();

auth.post('/confirm', handleExceptions(authCtrl.confirm));

export default auth;
