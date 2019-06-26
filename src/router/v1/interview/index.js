import express from 'express';
import { handleExceptions } from 'middlewares';
import * as interviewCtrl from './interview.ctrl';

const interview = express.Router();

interview.get('/', handleExceptions(interviewCtrl.listInterviews));
interview.get('/:id', handleExceptions(interviewCtrl.showInterview));

export default interview;
