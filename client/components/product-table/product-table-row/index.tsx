"use client"

import React, { useState } from "react"
import { RatingStars } from "../RatingStars"
import { ThumbnailCell } from "../ThumbnailCell"
import { ActionButtons } from "./ActionButtons"
import { RowExpandButton } from "../RowExpandButton"
import ProductRowDetails from "../ProductRowDetails"
import { ProductType } from "@/lib/validation/productSchema"

interface ProductTableRowProps {
    product: ProductType
    isExpanded: boolean
    onToggleExpand: () => void
    onEdit: (product: any) => void
    onDelete: (productId: number) => void
}


export default function ProductTableRow({
    product,
    onEdit,
    onDelete,
}: ProductTableRowProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleExpand = () => setIsExpanded(!isExpanded)

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(value)

    return (
        <>
            <tr
                className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={toggleExpand}
            >
                <td className="px-4 py-3 text-gray-500">
                    <RowExpandButton isExpanded={isExpanded} />
                </td>
                <td className="px-4 py-3">
                    <ThumbnailCell
                        src={product.thumbnail}
                        title={product.title}
                        sku={product.sku}
                    />
                </td>
                <td className="px-4 py-3 text-gray-700 capitalize">{product.category}</td>
                <td className="px-4 py-3 text-gray-700">{product.brand}</td>
                <td className="px-4 py-3 text-right">
                    <div className="font-medium text-gray-900">
                        {formatCurrency(product.price || 0)}
                    </div>
                    {product.discountPercentage > 0 && (
                        <div className="text-sm text-green-600">{product.discountPercentage}% off</div>
                    )}
                </td>
                <td className="px-4 py-3 text-center">
                    {product.rating ? (
                        <RatingStars rating={product.rating} />
                    ) : (
                        <span className="text-gray-400">No rating</span>
                    )}
                </td>
                <td className="px-4 py-3 text-right">
                    <div className="font-medium text-gray-900">{product.stock}</div>
                    <div className="text-sm text-gray-500">Min: {product.minimumOrderQuantity || 1}</div>
                    <div className="text-xs text-gray-400 capitalize">{product.availabilityStatus}</div>
                </td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <ActionButtons product={product} onEdit={onEdit} onDelete={onDelete} />
                </td>
            </tr>
            {isExpanded && (
                <tr className="bg-gray-50">
                    <td colSpan={8} className="px-4 py-3">
                        <ProductRowDetails product={product} />
                    </td>
                </tr>
            )}
        </>
    )
}
