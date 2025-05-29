import express, { Router, RequestHandler } from 'express';
import * as productController from './product.controller';

const router: Router = express.Router();

router.get('/', productController.getAllProducts as RequestHandler);
router.get('/:id', productController.getProductById as RequestHandler);
router.post('/', productController.createProduct as RequestHandler);
router.put('/:id', productController.updateProduct as RequestHandler);
router.delete('/:id', productController.deleteProduct as RequestHandler);

export default router;
