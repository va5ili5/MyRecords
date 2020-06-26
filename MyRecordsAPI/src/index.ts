import 'reflect-metadata';

import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { createConnection } from 'typeorm';
import labelRouter from './routes/label.route';
import releaseRoutes from './routes/release.route';
import userRoutes from './routes/user.route';
dotenv.config();

// app variables
if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = +process.env.PORT;
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
createConnection();
app.use(userRoutes);
app.use(releaseRoutes);
app.use(labelRouter);
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
