export async function fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeout = 10000
): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
        }

        return response;
    } catch (error: any) {
        if (error.name === "AbortError") {
            throw new Error("Request timed out");
        }
        if (error instanceof TypeError && error.message === "Failed to fetch") {
            throw new Error("Network error: Unable to reach the server. Check your internet or backend.");
        }

        throw new Error(error.message || "Unknown fetch error");
    } finally {
        clearTimeout(id);
    }
}
