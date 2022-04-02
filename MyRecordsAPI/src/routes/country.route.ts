import Router from 'express';
import { getCountries } from '../controllers/country.controller';

const router = Router();

router.get('/api/v1/countries', getCountries);

export default router;
