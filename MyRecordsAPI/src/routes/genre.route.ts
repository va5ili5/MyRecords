import Router from 'express';
import { createGenre, getGenreById, getGenres } from '../controllers/genre.controller';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

router.get('/api/v1/genres/', getGenres);
router.get('/api/v1/genres/:id', getGenreById);
//router.post('/api/v1/releases/create', createGenre);

export default router;