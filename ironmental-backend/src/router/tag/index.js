import express from 'express';
import * as tagCtrl from './tag.ctrl'

const tag = express.Router()

tag.get('/', tagCtrl.tagList)

export default tag