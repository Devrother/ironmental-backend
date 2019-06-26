import express from 'express';
import auth from './auth'
import interview from './interview';
import sub from './sub';
import tag from './tag';

const v1 = express.Router();

v1.use('/auth', auth);
v1.use('/interviews', interview);
v1.use('/subscribers', sub);
v1.use('/tags', tag);

export default v1;