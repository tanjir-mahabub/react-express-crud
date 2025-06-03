import { fetchWithTimeout } from "../fetchWithTimeout";

export const createRequestOptions = (method: string, data?: any): RequestInit => ({
    method,
    headers: { "Content-Type": "application/json" },
    ...(data && { body: JSON.stringify(data) }),
});

export async function requestWithJson<T>(url: string, options: RequestInit): Promise<T> {
    const res = await fetch(url, options);
    if (!res.ok) {
        // error handling
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    // If 204 No Content or empty body, return undefined or null
    if (res.status === 204) {
        return undefined as unknown as T;
    }
    const text = await res.text();
    return text ? JSON.parse(text) : undefined as unknown as T;
}


export function handleRequestError(context: string, error: unknown): never {
    // console.error(`${context} error:`, error);
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("An unknown error occurred.");
}