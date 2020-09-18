import Router from 'express';
import {
  loginUser,
  signUpUser,
  getUserById,
} from '../controllers/user.controller';

const router = Router();

router.get('/api/v1/user/:id', getUserById);
router.post('/api/v1/user/login', loginUser);
router.post('/api/v1/user/signup', signUpUser);

export default router;
