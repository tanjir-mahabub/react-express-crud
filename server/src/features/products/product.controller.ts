import { Request, Response } from 'express';
import * as productService from './product.service';
import { productSchema } from './product.schema';

export const getAllProducts = async (req: Request, res: Response) => {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
};

export const getProductById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const product = await productService.getProductById(id);

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
};

export const createProduct = async (req: Request, res: Response) => {
    const result = productSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error.errors });
    }

    const product = await productService.createProduct(result.data);
    res.status(201).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const existing = await productService.getProductById(id);
    if (!existing) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const product = await productService.updateProduct(id, req.body);
    res.status(200).json(product);
};

export const deleteProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const existing = await productService.getProductById(id);
    if (!existing) {
        return res.status(404).json({ message: 'Product not found' });
    }

    await productService.deleteProduct(id);
    res.status(204).send();
};
