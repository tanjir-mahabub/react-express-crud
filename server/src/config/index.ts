import dotenv from 'dotenv';

dotenv.config();

export default {
    port: parseInt(process.env.PORT || '4000', 10),
    databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
    dummyJsonApi: process.env.DUMMYJSON_API || 'https://dummyjson.com/products',
    frontendOrigin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
};
