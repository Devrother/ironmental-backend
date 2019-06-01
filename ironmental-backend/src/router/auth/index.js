import express from 'express';
import * as authCtrl from './auth.ctrl'

const auth = express.Router()

auth.post('/confirm', authCtrl.confirm)

export default auth