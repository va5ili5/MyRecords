import Router from 'express';
import { createUser, getUser } from '../controllers/user.controller';

const router = Router();

router.get('/api/user/:id', getUser);
router.post('/api/user', createUser);

export default router;
