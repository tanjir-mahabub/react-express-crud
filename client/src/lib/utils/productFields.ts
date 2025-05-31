export const requiredProductFields = {
    title: { label: 'Title', type: 'text', required: true },
    description: { label: 'Description', type: 'text', required: true },
    category: { label: 'Category', type: 'text', required: true },
    price: { label: 'Price', type: 'number', required: true },
    stock: { label: 'Stock', type: 'number', required: true },
    brand: { label: 'Brand', type: 'text', required: true },
    thumbnail: { label: 'Thumbnail URL', type: 'text', required: true },
    'meta.barcode': { label: 'Barcode', type: 'text', required: true },

    // Optional field
    tags: { label: 'Tags (comma-separated)', type: 'text', required: false },
} as const;

export type ProductFieldKey = keyof typeof requiredProductFields;
