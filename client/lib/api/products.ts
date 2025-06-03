import { ProductType } from "@/lib/validation/productSchema";
import { extractProducts } from "@/lib/extractProducts";
import { API_BASE_URL } from "./config";
import {
    createRequestOptions,
    requestWithJson,
    handleRequestError,
} from "./utils/request";

export async function fetchProducts(): Promise<ProductType[]> {
    try {
        const data = await requestWithJson<any>(
            `${API_BASE_URL}/products`,
            createRequestOptions("GET")
        );
        return extractProducts(data);
    } catch (error) {
        handleRequestError("fetchProducts", error);        
    }
}

export async function deleteProduct(productId: number): Promise<boolean> {
    try {
        await requestWithJson<void>(
            `${API_BASE_URL}/products/${productId}`,
            createRequestOptions("DELETE")
        );
        return true;
    } catch (error) {
        handleRequestError(`deleteProduct (${productId})`, error);
    }
}

export async function createProduct(data: ProductType): Promise<ProductType> {
    try {
        console.log("Sending product data to API:", data); // ✅ log here
        return await requestWithJson<ProductType>(
            `${API_BASE_URL}/products`,            
            createRequestOptions("POST", data)
        );
    } catch (error) {
        handleRequestError("createProduct", error);
    }
}

export async function updateProduct(
    id: string | number,
    data: ProductType
): Promise<ProductType> {
    try {
        return await requestWithJson<ProductType>(
            `${API_BASE_URL}/products/${id}`,
            createRequestOptions("PUT", data)
        );
    } catch (error) {
        handleRequestError(`updateProduct (${id})`, error);
    }
}

export async function checkServerHealth(): Promise<boolean> {
    try {
        const res = await fetch(`${API_BASE_URL}/health`, {
            method: "GET",
            cache: "no-cache",
        });

        const json = await res.json();
        return res.ok && json.status === "ok";
    } catch {
        return false;
    }
}