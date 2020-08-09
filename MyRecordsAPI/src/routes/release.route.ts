import Router from 'express';
import { getReleases, getReleaseById } from '../controllers/release.controller';

const router = Router();

router.get('/api/v1/releases', getReleases);
router.get('/api/v1/releases/:id', getReleaseById);

export default router;
