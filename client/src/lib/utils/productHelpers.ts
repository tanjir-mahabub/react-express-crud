export function extractProductFormData(formData: FormData) {
    const get = (field: string) => formData.get(field)?.toString().trim() || "";

    return {
        title: get("title"),
        description: get("description"),
        category: get("category"),
        price: parseFloat(get("price")),
        stock: parseInt(get("stock")),
        brand: get("brand"),
        thumbnail: get("thumbnail"),
        tags: get("tags")?.split(",").map((t) => t.trim()).filter(Boolean) || [],
        meta: {
            barcode: get("meta.barcode"),
        },
    };
}
