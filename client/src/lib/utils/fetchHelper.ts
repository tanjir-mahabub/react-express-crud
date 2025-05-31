import { API_BASE } from "./apiBase";

export async function sendJSON(
    endpoint: string,
    method: 'POST' | 'PUT' | 'DELETE',
    data?: Record<string, unknown>
) {
    console.log("sendJSON called with:", { endpoint, method, data });

    const res = await fetch(`${API_BASE}${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: data ? JSON.stringify(data) : undefined,
    });

    if (!res.ok) {
        const errorText = await res.text(); // capture backend error message
        console.error(`API call failed: ${res.status}`, errorText);
        throw new Error(`API call failed: ${res.status}`);
    }

    return res.json();
}
