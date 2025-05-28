export function extractProductFormData(formData: FormData) {
    return {
        title: formData.get('title')?.toString() || '',
        description: formData.get('description')?.toString() || '',
        price: Number(formData.get('price') || 0)
    };
}