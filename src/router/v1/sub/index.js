import express from 'express';
import { handleExceptions } from 'middlewares';
import * as subCtrl from './sub.ctrl';

const sub = express.Router();

sub.post('/', handleExceptions(subCtrl.subscribe));

export default sub;
