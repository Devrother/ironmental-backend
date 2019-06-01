import express from 'express';
import * as subCtrl from './sub.ctrl'

const sub = express.Router()

sub.post('/', subCtrl.subscribe)

// TODO: test 용도
sub.get('/', subCtrl.show)

export default sub