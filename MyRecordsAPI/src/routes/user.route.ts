import Router from 'express';
import {
  loginUser,
  signUpUser,
  getUserById,
} from '../controllers/user.controller';

const router = Router();

router.get('/api/v1/users/:id', getUserById);
router.post('/api/v1/users/login', loginUser);
router.post('/api/v1/users/signup', signUpUser);

export default router;
