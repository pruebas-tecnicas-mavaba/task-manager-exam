import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const taskServiceClient = axios.create({
  baseURL: process.env.TASK_SERVICE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default taskServiceClient;