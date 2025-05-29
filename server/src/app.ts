import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import config from './config';
import productRoutes from './features/products/product.route';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Security Headers
app.use(helmet());

// CORS
app.use(cors({ 
    origin: config.frontendOrigin,
    credentials: true
}));

// Body parser
app.use(express.json());

// Rate Limiting
app.use(
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false
    })
);

// Welcome Routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: '🎉 Welcome to the Product API!',
        health: '/api/health',
        products: '/api/products'
    });
});

// Health Check
app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Product Routes
app.use('/api/products', productRoutes);

// Optional: Global error handler
app.use(errorHandler); // Only if you have this middleware

export default app;
