import express from 'express';
import * as interviewCtrl from './interview.ctrl'

const interview = express.Router()

interview.get('/', interviewCtrl.listInterviews) // GET /interviews?tag=..&limit=..&offset=..
interview.post('/', interviewCtrl.createInterview)
interview.get('/:id', interviewCtrl.showInterview) // GET /interviews/:id

export default interview