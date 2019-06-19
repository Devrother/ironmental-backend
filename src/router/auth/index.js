import express from 'express';
import * as authCtrl from './auth.ctrl'
import { handleExceptions } from 'middlewares';

const auth = express.Router()

auth.post('/confirm', handleExceptions(authCtrl.confirm))

export default auth