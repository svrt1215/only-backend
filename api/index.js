// backend/api/index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import resultRoutes from '../routes/result.js';

dotenv.config();

const app = express();

const corsOptions = {
  origin: ['https://clg-web-z5c9.vercel.app', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight
app.use(express.json());
app.use('/api/results', resultRoutes);

// Initialize mongoose connection on first cold start
let isConnected = false;
async function initDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
}

export default async (req, res) => {
  await initDB();
  return app(req, res);
};
