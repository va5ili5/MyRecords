import 'reflect-metadata';

import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { createConnection } from 'typeorm';
import formsDataRoutes from './routes/formsdata.route';
import labelRoutes from './routes/label.route';
import releaseRoutes from './routes/release.route';
import userRoutes from './routes/user.route';
import artistRoutes from './routes/artist.route';
import genreRoutes from './routes/genre.route';
import styleRoutes from './routes/style.route';
import countryRoutes from './routes/country.route';
import formatRoutes from './routes/format.route';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';

import { Image } from './entity/Image';
dotenv.config();

// app variables
if (!process.env.PORT) {
  process.exit(1);
}

// swagger

const PORT: number = +process.env.PORT;
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
createConnection();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(formsDataRoutes);
app.use(userRoutes);
app.use(releaseRoutes);
app.use(labelRoutes);
app.use(artistRoutes);
app.use(genreRoutes);
app.use(styleRoutes);
app.use(countryRoutes);
app.use(formatRoutes);
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
