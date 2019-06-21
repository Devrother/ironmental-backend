import express from 'express';
import { handleExceptions } from 'middlewares';
import * as tagCtrl from './tag.ctrl';

const tag = express.Router();

tag.get('/', handleExceptions(tagCtrl.tagList));

export default tag;
