import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

// health route
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

export default app;

