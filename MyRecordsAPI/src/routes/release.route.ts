import Router from 'express';
import { getReleases, getReleaseById } from '../controllers/release.controller';

const router = Router();

router.get('/api/releases', getReleases);
router.get('/api/releases/:id', getReleaseById);

export default router;
