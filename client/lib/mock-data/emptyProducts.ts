import { ProductFormValues } from "@/lib/validation/productFormSchema"

export const emptyProduct: ProductFormValues = {
    title: "",
    description: "",
    category: "",
    brand: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    tags: [],
    sku: "",
    weight: 0,
    dimensions: { width: 0, height: 0, depth: 0 },
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "available",
    returnPolicy: "",
    minimumOrderQuantity: 1,
    meta: { barcode: "", qrCode: "" },
    thumbnail: "",
    images: [],
}
