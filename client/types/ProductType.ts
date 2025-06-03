export interface Product {
    id: number
    title: string
    description?: string
    category?: string
    brand?: string
    price?: number
    discountPercentage?: number
    rating?: number
    stock?: number
    tags?: string[]
    sku?: string
    weight?: number
    dimensions?: {
        width?: number
        height?: number
        depth?: number
    }
    warrantyInformation?: string
    shippingInformation?: string
    availabilityStatus?: string
    returnPolicy?: string
    minimumOrderQuantity?: number
    meta?: {
        createdAt?: string
        updatedAt?: string
        barcode?: string
        qrCode?: string
    }
    reviews?: any[]
    images?: string[]
    thumbnail?: string
}