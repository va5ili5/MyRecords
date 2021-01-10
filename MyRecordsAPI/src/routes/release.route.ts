import Router from 'express';
import { isAuthenticated } from '../middleware/auth';
import { getReleases, getReleaseById, createRelease } from '../controllers/release.controller';

const router = Router();

router.get('/api/v1/releases', getReleases);
router.get('/api/v1/releases/:id', getReleaseById);
router.post('/api/v1/releases/create', isAuthenticated, createRelease);
export default router;
