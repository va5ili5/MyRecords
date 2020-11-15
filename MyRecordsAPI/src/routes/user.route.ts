import Router from 'express';
import {
  loginUser,
  registerUser,
  getUserById,
} from '../controllers/user.controller';

const router = Router();

router.get('/api/v1/users/:id', getUserById);
router.post('/api/v1/users/login', loginUser);
router.post('/api/v1/users/register', registerUser);

export default router;
