import { ProductFormValues } from "@/lib/validation/productFormSchema"

export const mockProduct: ProductFormValues = {
    title: "Premium Wireless Noise-Cancelling Headphones",
    description: "Experience crystal-clear sound with our state-of-the-art wireless headphones...",
    category: "electronics",
    brand: "SoundMaster Pro",
    price: 349.99,
    discountPercentage: 15.5,
    rating: 4.8,
    stock: 85,
    minimumOrderQuantity: 1,
    tags: ["wireless", "noise-cancelling", "bluetooth", "premium", "over-ear"],
    sku: "SM-PRO-2024",
    weight: 285,
    dimensions: {
        width: 19.2,
        height: 17.5,
        depth: 7.8,
    },
    warrantyInformation: "3-year limited warranty covering manufacturing defects",
    shippingInformation: "Free express shipping on all orders...",
    availabilityStatus: "available",
    returnPolicy: "45-day hassle-free returns...",
    meta: {
        barcode: "9876543210987",
        qrCode: "https://api.soundmaster.com/qr/sm-pro-2024",
    },
    thumbnail: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    images: [
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=600&fit=crop&crop=left",
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=600&fit=crop&crop=right",
    ],
    reviews: [
        {
            reviewerName: "Alex Johnson",
            rating: 5,
            comment: "The best headphones I've ever owned! The noise cancellation is incredible.",
            date: "2023-10-15",
        },
        {
            reviewerName: "Sam Wilson",
            rating: 4,
            comment: "Great sound quality, but a bit heavy for long sessions.",
            date: "2023-09-28",
        },
    ],
}
