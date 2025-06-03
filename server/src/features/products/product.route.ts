import { Router } from 'express';
import {
    createProduct,
    getProduct,
    getAllProducts,
    updateProduct,
    deleteProduct,
} from './product.controller';

import { methodNotAllowedHandler } from '../../middleware/methodNotAllowedHandler';
import { upload } from '../../utils/multer';

const router = Router();

router
    .route('/')
    .get(getAllProducts)
    .post(
        upload.fields([
            { name: 'thumbnail', maxCount: 1 },
            { name: 'images', maxCount: 10 },
        ]),
        createProduct
    )
    .all(methodNotAllowedHandler);

router
    .route('/:id')
    .get(getProduct)
    .put(updateProduct)
    .delete(deleteProduct)
    .all(methodNotAllowedHandler);

export default router;
