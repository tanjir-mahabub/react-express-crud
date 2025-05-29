import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import config from './config';
import { scrapeAndSaveProducts } from './services/productService';

const app = express();

app.use(helmet());

app.use(cors({ origin: config.frontendOrigin }));

app.use(express.json());

app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
    })
);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/api/scrape', async (req, res) => {
    try {
        const count = await scrapeAndSaveProducts(config.dummyJsonApi);
        res.json({ message: `Scraped and saved ${count} products.` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to scrape products' });
    }
});

export default app;
