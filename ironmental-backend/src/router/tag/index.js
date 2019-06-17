import express from 'express';
import * as tagCtrl from './tag.ctrl'
import { handleExceptions } from 'middlewares'

const tag = express.Router()

tag.get('/', handleExceptions(tagCtrl.tagList))

export default tag