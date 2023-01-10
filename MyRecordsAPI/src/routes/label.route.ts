import Router from 'express';
import {
  getLabels,
  getLabelById,
  createLabel,
  getReleaseLabels,
} from '../controllers/label.controller';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

router.get('/api/v1/labels', getLabels);
router.get('/api/v1/releaselabels', getReleaseLabels);
router.get('/api/v1/labels/:id', getLabelById);
router.post('/api/v1/labels/create', isAuthenticated, createLabel);
export default router;
