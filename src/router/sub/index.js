import express from 'express';
import { handleExceptions } from 'middlewares';
import * as subCtrl from './sub.ctrl';

const sub = express.Router();

sub.post('/', handleExceptions(subCtrl.subscribe));

// TODO: test 용도
sub.get('/', handleExceptions(subCtrl.show));

export default sub;
