import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import config from './config';
import productRoutes from './features/products/product.route';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';

const app = express();

// Security & middleware
app.use(helmet());
app.use(cors({ origin: config.frontendOrigin, credentials: true }));
app.use(express.json());
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
}));

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Routes
app.get('/', (_req, res) => {
    res.status(200).json({
        message: '🎉 Welcome to the Product API!',
        health: '/api/health',
        products: '/api/products',
    });
});


app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.use('/api/products', productRoutes);

// 404 handler
app.use(notFoundHandler);

// Central error handler
app.use(errorHandler);

export default app;
