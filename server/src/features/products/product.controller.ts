import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import {
    findAllProducts,
    findProductById,
    createProductService,
    updateProductService,
    deleteProductService,
} from './product.service';

import {
    productCreateSchema,
    productUpdateSchema,
} from './product.schema';
import { BadRequestError } from '../../errors/BadRequestError';

// GET /api/products
export const getAllProducts = catchAsync(async (_req: Request, res: Response) => {
    const products = await findAllProducts();
    res.json({ status: 'success', data: products });
});

// GET /api/products/:id
export const getProduct = catchAsync(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new BadRequestError('Invalid product id');

    const product = await findProductById(id);
    res.json({ status: 'success', data: product });
});

// POST /api/products
export const createProduct = catchAsync(async (req: Request, res: Response) => {
    const parsed = productCreateSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new BadRequestError('Validation failed: ' + parsed.error.errors.map(e => e.message).join(', '));
    }

    const product = await createProductService(parsed.data);
    res.status(201).json({ status: 'success', data: product });
});

// PUT /api/products/:id
export const updateProduct = catchAsync(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new BadRequestError('Invalid product id');

    const parsed = productUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
        throw new BadRequestError('Validation failed: ' + parsed.error.errors.map(e => e.message).join(', '));
    }

    const product = await updateProductService(id, parsed.data);
    res.json({ status: 'success', data: product });
});

// DELETE /api/products/:id
export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) throw new BadRequestError('Invalid product id');

    await deleteProductService(id);
    res.status(204).send();
});
