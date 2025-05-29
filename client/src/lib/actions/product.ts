import { API_BASE } from "../utils/apiBase";
import { sendJSON } from "../utils/fetchHelper";
import { extractProductFormData } from "../utils/productHelpers";

export async function getProducts() {
    const res = await fetch(`${API_BASE}/products`, {
        cache: 'no-store',
    });
    if(!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.products;
}

// Create Product
export async function createProduct(formData: FormData) {
    const product = extractProductFormData(formData);
    await sendJSON('/products/add', 'POST', product);
}

// Update Product
export async function updateProduct(formData: FormData) {
    const id = formData.get('id')?.toString();
    if (!id) throw new Error('Missing product ID');

    const updatedProduct = extractProductFormData(formData);
    await sendJSON(`/products/${id}`, 'PUT', updatedProduct);    
}

// Remove Product
export async function removeProduct(formData: FormData) {
    const id = formData.get('id')?.toString();
    if (!id) throw new Error('Missing product ID');

    await sendJSON(`/products/${id}`, 'DELETE');
}