import Router from 'express';
import { createUser } from '../controllers/user.controller';

const router = Router();

router.post('/api/signup', createUser);

export default router;
