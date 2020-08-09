import Router from 'express';
import { getArtists } from '../controllers/artist.controller';

const router = Router();

router.get('/api/v1/artists', getArtists);

export default router;
