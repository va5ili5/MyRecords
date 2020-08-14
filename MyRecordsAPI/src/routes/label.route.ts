import Router from 'express';
import { getLabels, getLabelById } from '../controllers/label.controller';

const router = Router();

router.get('/api/v1/labels', getLabels);
router.get('/api/v1/labels/:id', getLabelById);
export default router;
