import { ProductType } from "./validation/productSchema";

export function extractProducts(raw: any): ProductType[] {
    if (Array.isArray(raw)) return raw;
    if (Array.isArray(raw.products)) return raw.products;
    if (Array.isArray(raw.data)) return raw.data;
    return [];
}