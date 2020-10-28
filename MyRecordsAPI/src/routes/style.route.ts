import Router from 'express';
import { createStyle, getStyleById, getStylesByGenreId } from '../controllers/style.controller';
import { isAuthenticated } from '../middleware/auth';

const router = Router();

router.get('/api/v1/stylesbygenre/:genreId', getStylesByGenreId);
router.get('/api/v1/styles/:id', getStyleById);
router.post('/api/v1/styles/create', createStyle);

export default router;