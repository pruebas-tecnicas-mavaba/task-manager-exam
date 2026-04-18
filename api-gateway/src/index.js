import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import tasksRoutes from './routes/tasks.routes.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({
    message: 'API Gateway is running'
  });
});

app.use('/api/tasks', tasksRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});