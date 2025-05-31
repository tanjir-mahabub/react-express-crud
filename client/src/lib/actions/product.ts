import { API_BASE } from "../utils/apiBase";
import { sendJSON } from "../utils/fetchHelper";
import { extractProductFormData } from "../utils/productHelpers";

function validateId(id: unknown): string {
    if (!id || typeof id !== 'string' || id.trim() === '') {
        throw new Error('Invalid or missing product ID');
    }
    return id;
}

function validateFormData(formData: FormData) {
    if (!(formData instanceof FormData)) {
        throw new Error('Invalid form data provided');
    }
}

export async function getProducts() {
    try {
        const res = await fetch(`${API_BASE}/products`, { cache: 'no-store' });
        if (!res.ok) {
            throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        if (!data || data.status !== 'success' || !Array.isArray(data.data)) {
            throw new Error('Invalid data format received from server');
        }

        return data.data;
    } catch (error: unknown) {
        console.error('Error in getProducts:', error);
        throw error instanceof Error ? error : new Error('Unknown error occurred fetching products');
    }
}

export interface CreateProductPayload {
    title: string;
    description: string;
    price: number;
    category: string;
    thumbnail: string;
    images: string[];
    tags?: string[];
}

export async function createProduct(payload: CreateProductPayload) {
    const response = await fetch('http://localhost:4000/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API call failed: ${response.status} ${JSON.stringify(errorData)}`);
    }

    return response.json();
}


export async function updateProduct(formData: FormData): Promise<void> {
    try {
        validateFormData(formData);

        const id = validateId(formData.get('id')?.toString());
        const updatedProduct = extractProductFormData(formData);
        if (!updatedProduct) throw new Error('Invalid product data for update');

        await sendJSON(`/products/${id}`, 'PUT', updatedProduct);
    } catch (error: unknown) {
        console.error('Error in updateProduct:', error);
        throw error instanceof Error ? error : new Error('Unknown error occurred updating product');
    }
}

export async function removeProduct(formData: FormData): Promise<void> {
    try {
        validateFormData(formData);

        const id = validateId(formData.get('id')?.toString());
        await sendJSON(`/products/${id}`, 'DELETE');
    } catch (error: unknown) {
        console.error('Error in removeProduct:', error);
        throw error instanceof Error ? error : new Error('Unknown error occurred removing product');
    }
}
