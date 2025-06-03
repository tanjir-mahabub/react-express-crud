import React, { useState } from "react"
import { Pencil, Trash2, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductRowDetails from "./ProductRowDetails"

interface ProductTableRowProps {
    product: any
    // isExpanded: boolean
    // toggleExpand: () => void
    onEdit: (product: any) => void
    onDelete: (productId: number) => void
}

export default function ProductTableRow({
    product,
    // isExpanded,
    // toggleExpand,
    onEdit,
    onDelete,
}: ProductTableRowProps) {

    const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({})

    const isExpanded = !!expandedRows[product.id];

    const toggleRowExpand = (productId: string) => {
        setExpandedRows((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }))
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value)
    }

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
        <>
            <React.Fragment key={product.id}>
                <tr
                    className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => toggleRowExpand(product.id)}
                >
                    <td className="px-4 py-3 text-gray-500">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ChevronRight
                                className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                            />
                        </Button>
                    </td>
                    <td className="px-4 py-3">
                        <div className="flex items-center">
                            <div className="h-10 w-10 rounded-md bg-gray-100 mr-3 overflow-hidden flex-shrink-0">
                                <img
                                    src={product.thumbnail || "/placeholder.svg"}
                                    alt={product.title}
                                    className="h-full w-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = "/placeholder.svg?height=40&width=40"
                                    }}
                                />
                            </div>
                            <div>
                                <div className="font-medium text-gray-900">{product.title}</div>
                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                    {product.sku && <span className="text-blue-600">SKU: {product.sku}</span>}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700 capitalize">{product.category}</td>
                    <td className="px-4 py-3 text-gray-700">{product.brand}</td>
                    <td className="px-4 py-3 text-right">
                        <div className="font-medium text-gray-900">{formatCurrency(product.price || 0)}</div>
                        {product.discountPercentage > 0 && (
                            <div className="text-sm text-green-600">{product.discountPercentage}% off</div>
                        )}
                    </td>
                    <td className="px-4 py-3 text-center">
                        {product.rating ? renderStars(product.rating) : <span className="text-gray-400">No rating</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                        <div className="font-medium text-gray-900">{product.stock}</div>
                        <div className="text-sm text-gray-500">Min: {product.minimumOrderQuantity || 1}</div>
                        <div className="text-xs text-gray-400 capitalize">{product.availabilityStatus}</div>
                    </td>
                    <td className="px-4 py-3">
                        <div className="flex items-center justify-center space-x-2" onClick={(e) => e.stopPropagation()}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onEdit(product)
                                }}
                            >
                                <Pencil className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onDelete(product.id)
                                }}
                            >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                            </Button>
                        </div>
                    </td>
                </tr>
                {isExpanded && (
                    <tr className="bg-gray-50">
                        <td colSpan={8} className="px-4 py-3">
                            <ProductRowDetails product={product} />
                        </td>
                    </tr>
                )}
            </React.Fragment>
        </>
    )
}
