import Router from 'express';
import { createUser, getUserById } from '../controllers/user.controller';

const router = Router();

router.get('/api/user/:id', getUserById);
router.post('/api/user', createUser);

export default router;
