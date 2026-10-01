import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { pool } from './db/pool.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', db: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Servidor en http://localhost:${process.env.PORT}`)
);