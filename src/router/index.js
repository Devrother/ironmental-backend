import express from 'express';
import auth from './auth';
import interview from './interview';
import sub from './sub';
import tag from './tag';

const router = express.Router();

router.use('/api/v1/auth', auth);
router.use('/api/v1/interviews', interview);
router.use('/api/v1/sub', sub);
router.use('/api/v1/tags', tag);

export default router;
