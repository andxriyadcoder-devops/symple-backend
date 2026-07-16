import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import routes from './routes/index';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(helmet());

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🚀 Symple Backend Running...',
  });
});

app.use('/api/v1', routes);

app.use(errorHandler);

export default app;