import React from "react"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

export default function ProductRowDetails({ product }: { product: any }) {
    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`h-3 w-3 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                ))}
                <span className="ml-1 text-xs text-gray-600">{rating.toFixed(1)}</span>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
            {/* Product Details */}
            <div className="lg:col-span-2 space-y-4">
                <div>
                    <h4 className="font-medium text-gray-900 mb-2">Product Details</h4>
                    <p className="text-gray-700 mb-4">{product.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-medium text-gray-600">Weight:</span>
                            <span className="ml-2">{product.weight}g</span>
                        </div>
                        <div>
                            <span className="font-medium text-gray-600">Dimensions:</span>
                            <span className="ml-2">
                                {product.dimensions?.width} × {product.dimensions?.height} × {product.dimensions?.depth}{" "}
                                cm
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {product.tags?.map((tag: string) => (
                            <Badge key={tag} variant="secondary" className="bg-gray-200 text-gray-800">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Additional Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {product.warrantyInformation && (
                        <div>
                            <span className="font-medium text-gray-600">Warranty:</span>
                            <p className="text-gray-700 mt-1">{product.warrantyInformation}</p>
                        </div>
                    )}
                    {product.shippingInformation && (
                        <div>
                            <span className="font-medium text-gray-600">Shipping:</span>
                            <p className="text-gray-700 mt-1">{product.shippingInformation}</p>
                        </div>
                    )}
                    {product.returnPolicy && (
                        <div>
                            <span className="font-medium text-gray-600">Return Policy:</span>
                            <p className="text-gray-700 mt-1">{product.returnPolicy}</p>
                        </div>
                    )}
                    {(product.meta?.barcode || product.meta?.qrCode) && (
                        <div>
                            <span className="font-medium text-gray-600">Codes:</span>
                            <div className="text-gray-700 mt-1">
                                {product.meta?.barcode && <div>Barcode: {product.meta.barcode}</div>}
                                {product.meta?.qrCode && <div>QR: {product.meta.qrCode}</div>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Reviews */}
                {product.reviews && product.reviews.length > 0 && (
                    <div>
                        <h5 className="font-medium text-gray-900 mb-2">Recent Reviews</h5>
                        <div className="space-y-2">
                            {product.reviews.slice(0, 2).map((review: { reviewerName: string; rating: number; comment: string; date: string }, index: number) => (
                                <div key={index} className="bg-white p-3 rounded border">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="font-medium text-sm">{review.reviewerName}</span>
                                        {renderStars(review.rating)}
                                    </div>
                                    <p className="text-sm text-gray-600">{review.comment}</p>
                                    <span className="text-xs text-gray-400">
                                        {new Date(review.date).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Product Images */}
            <div>
                <h4 className="font-medium text-gray-900 mb-2">Product Images</h4>
                <div className="grid grid-cols-2 gap-2">
                    {product.images?.map((image: string, index: number) => (
                        <div key={index} className="aspect-video bg-gray-100 rounded overflow-hidden">
                            <img
                                src={image || "/placeholder.svg"}
                                alt={`${product.title} - Image ${index + 1}`}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.src = "/placeholder.svg?height=120&width=160"
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
    </div>
    )
}
