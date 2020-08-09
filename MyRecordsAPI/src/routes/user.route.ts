import Router from 'express';
import { createUser, getUserById } from '../controllers/user.controller';

const router = Router();

router.get('/api/v1/user/:id', getUserById);
router.post('/api/v1/user', createUser);

export default router;
