export type Product = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: any; // Replace with specific type if possible, e.g., string[]
    brand: string;
    sku?: string;
    weight: number;
    width: number;
    height: number;
    depth: number;
    warrantyInformation?: string;
    shippingInformation?: string;
    availabilityStatus?: string;
    returnPolicy?: string;
    minimumOrderQuantity: number;
    images: any;
    thumbnail: string;
    meta?: ProductMeta;

    // Optional - if you're sending related data
    reviews?: Review[];
    seededProduct?: SeededProduct;
};

export type Review = {
    id: number;
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
    productId: number;
};

export type SeededProduct = {
    id: number;
    productId: number;
    seededAt: string;
};

export type ProductMeta = {
    barcode?: string;
    qrCode?: string;    
};