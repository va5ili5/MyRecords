import Router from 'express';
import { getFormats } from '../controllers/format.controller';

const router = Router();

router.get('/api/v1/formats', getFormats);

export default router;
