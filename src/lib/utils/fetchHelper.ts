import { API_BASE } from "./apiBase";

export async function sendJSON(
    endpoint: string,
    method: 'POST' | 'PUT' | 'DELETE',
    data?: Record<string, unknown>
) {
    return await fetch(`${API_BASE}${endpoint}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: data ? JSON.stringify(data) : undefined,
    })
}