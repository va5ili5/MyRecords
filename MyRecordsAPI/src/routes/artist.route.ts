import Router from 'express';
import { isAuthenticated } from '../middleware/auth';
import { createArtist, getArtists } from '../controllers/artist.controller';

const router = Router();

router.get('/api/v1/artists', getArtists);
router.post('/api/v1/artists/create', isAuthenticated, createArtist);

export default router;
