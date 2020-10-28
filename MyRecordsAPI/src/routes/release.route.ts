import Router from 'express';
import { getReleases, getReleaseById, createRelease } from '../controllers/release.controller';

const router = Router();

router.get('/api/v1/releases', getReleases);
router.get('/api/v1/releases/:id', getReleaseById);
router.post('/api/v1/releases/create', createRelease);
export default router;
