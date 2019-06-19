import express from 'express';
import * as interviewCtrl from './interview.ctrl'
import { handleExceptions } from 'middlewares'

const interview = express.Router()

interview.get('/', handleExceptions(interviewCtrl.listInterviews))
interview.get('/:id', handleExceptions(interviewCtrl.showInterview))

export default interview