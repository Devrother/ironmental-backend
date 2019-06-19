import express from 'express';
import * as subCtrl from './sub.ctrl'
import { handleExceptions } from 'middlewares'

const sub = express.Router()

sub.post('/', handleExceptions(subCtrl.subscribe))

// TODO: test 용도
sub.get('/', handleExceptions(subCtrl.show))

export default sub