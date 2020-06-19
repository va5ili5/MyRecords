import Router from 'express';
import { getLabels } from '../controllers/label.controller';

const router = Router();

router.get('/api/labels', getLabels);
export default router;
