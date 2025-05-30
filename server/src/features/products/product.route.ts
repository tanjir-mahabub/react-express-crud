import { Router } from 'express';
import {
    createProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
} from './product.controller';

import { methodNotAllowedHandler } from '../../middleware/methodNotAllowedHandler';

const router = Router();

router
    .route('/')
    .get(getAllProducts)
    .post(createProduct)
    .all(methodNotAllowedHandler);

router
    .route('/:id')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct)
    .all(methodNotAllowedHandler);

export default router;
