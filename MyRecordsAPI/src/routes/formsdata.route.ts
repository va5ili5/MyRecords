import Router from 'express';
import { getFormsData } from '../controllers/formsdata.controller';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

router.get('/api/v1/formsdata', getFormsData);

export default router;