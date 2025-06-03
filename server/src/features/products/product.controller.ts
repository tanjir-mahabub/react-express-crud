import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import {
    findAllProducts,
    findProductById,
    createProductService,
    updateProductService,
    deleteProductService,
} from './product.service';

import { productCreateSchema, productUpdateSchema } from './product.schema';
import { BadRequestError } from '../../errors/BadRequestError';

// Helper functions for parsing inputs safely
const parseJsonField = <T>(value: unknown, fieldName: string): T | undefined => {
    if (!value) return undefined;
    try {
        if (typeof value === 'string') return JSON.parse(value) as T;
        return value as T;
    } catch {
        throw new BadRequestError(`Invalid format for ${fieldName}`);
    }
};

const parseNumberField = (value: unknown, defaultValue?: number): number | undefined => {
    if (value === undefined || value === null) return defaultValue;
    const num = Number(value);
    if (isNaN(num)) return defaultValue;
    return num;
};

const getIdFromParams = (param: string) => {
    const id = Number(param);
    if (isNaN(id)) throw new BadRequestError('Invalid product id');
    return id;
};

// GET all products
export const getAllProducts = catchAsync(async (_req: Request, res: Response) => {
    const products = await findAllProducts();
    res.json({ status: 'success', data: products });
});

// GET product by id
export const getProduct = catchAsync(async (req: Request, res: Response) => {
    const id = getIdFromParams(req.params.id);
    const product = await findProductById(id);
    res.json({ status: 'success', data: product });
});

// POST create product
export const createProduct = catchAsync(async (req: Request, res: Response) => {
    const files = req.files as {
        thumbnail?: Express.Multer.File[];
        images?: Express.Multer.File[];
    };

    // Resolve thumbnail: file path or body URL
    const thumbnail =
        files?.thumbnail?.[0]?.path ||
        (typeof req.body.thumbnail === 'string' ? req.body.thumbnail : undefined);
    if (!thumbnail) throw new BadRequestError('Thumbnail is required');

    // Resolve images: file paths or body JSON array
    let images: string[] = [];
    if (files?.images?.length) {
        images = files.images.map(f => f.path);
    } else {
        images = parseJsonField<string[]>(req.body.images, 'images') || [];
    }
    if (!images.length) throw new BadRequestError('At least one image is required');

    // Parse other fields
    const tags = parseJsonField<string[]>(req.body.tags, 'tags') || [];
    const dimensions = parseJsonField<{ width: number; height: number; depth: number }>(
        req.body.dimensions,
        'dimensions'
    );
    const meta = parseJsonField<Record<string, unknown>>(req.body.meta, 'meta');

    // Prepare data object for validation
    const dataToValidate = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        brand: req.body.brand,
        price: parseNumberField(req.body.price),
        discountPercentage: parseNumberField(req.body.discountPercentage),
        stock: parseNumberField(req.body.stock, 0),
        minimumOrderQuantity: parseNumberField(req.body.minimumOrderQuantity, 1),
        thumbnail,
        images,
        rating: req.body.rating ? parseNumberField(req.body.rating) : undefined,
        sku: req.body.sku,
        weight: req.body.weight ? parseNumberField(req.body.weight) : undefined,
        dimensions,
        meta,
        tags,
        warrantyInformation: req.body.warrantyInformation,
        shippingInformation: req.body.shippingInformation,
        returnPolicy: req.body.returnPolicy,
        availabilityStatus: req.body.availabilityStatus,
    };

    // Validate schema
    const parsed = productCreateSchema.safeParse(dataToValidate);
    if (!parsed.success) {
        const errors = parsed.error.errors.reduce((acc, err) => {
            acc[err.path[0]] = err.message;
            return acc;
        }, {} as Record<string, string>);
        return res.status(400).json({ errors });
    }

    const product = await createProductService(parsed.data);
    res.status(201).json({ status: 'success', data: product });
});

// PUT update product
export const updateProduct = catchAsync(async (req: Request, res: Response) => {
    const id = getIdFromParams(req.params.id);

    const parsed = productUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
        const messages = parsed.error.errors.map(e => e.message).join(', ');
        throw new BadRequestError(`Validation failed: ${messages}`);
    }

    const product = await updateProductService(id, parsed.data);
    res.json({ status: 'success', data: product });
});

// DELETE product
export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const id = getIdFromParams(req.params.id);
    await deleteProductService(id);
    res.status(204).send();
});
