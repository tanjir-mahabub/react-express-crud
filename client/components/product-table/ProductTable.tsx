"use client"

import React, { useEffect, useState } from "react"
import ProductTableHeader from "./ProductTableHeader"
import { ConnectionWarning } from "../ConnectionWarning"
import EmptyState from "./EmptyState"
import { PaginationControls } from "./PaginationControls"
import { usePagination } from "@/hooks/usePagination"
import { useRowExpansion } from "@/hooks/useRowExpansion"
import ProductTableRow from "./product-table-row"
import { useOnlineStatus } from "@/hooks/useOnlineStatus"
import ProductSkeleton from "./ProductSkeleton"
import { checkServerHealth } from "@/lib/api/products"
import { useProductSort } from "@/hooks/useProductSort"
import { ConfirmDialog } from "../ConfirmDialog"

interface ProductTableProps {
    products: any[]
    onEdit: (product: any) => void
    onDelete: (productId: number) => void
    isLoading: boolean
    error: string | null
    refetch: () => void
}

const ITEMS_PER_PAGE = 5

export default function ProductTable({
    products,
    onEdit,
    onDelete,
    isLoading,
    error,
    refetch,
}: ProductTableProps) {
    const { sortField, toggleSort, getSortIcon, sortData } = useProductSort<typeof products[0]>("title")
    const { isExpanded, toggleExpand } = useRowExpansion<number>()

    const isOnline = useOnlineStatus()
    const isFallback = !isOnline || (error && error.toLowerCase().includes("network"))
    const [wasFallback, setWasFallback] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)

    // Track fallback state changes and trigger refetch once recovered
    useEffect(() => {
        if (isFallback) {
            setWasFallback(true)
        }

        if (wasFallback && !isFallback) {
            refetch()
            setWasFallback(false)
        }
    }, [isFallback, wasFallback, refetch])

    // Poll server health when in fallback mode
    useEffect(() => {
        if (!isFallback) return

        const interval = setInterval(async () => {
            try {
                const serverIsHealthy = await checkServerHealth()
                if (serverIsHealthy) {
                    refetch()
                    setWasFallback(false)
                }
            } catch {
                // ignore errors, keep retrying
            }
        }, 10000) // retry every 10 seconds

        return () => clearInterval(interval)
    }, [isFallback, refetch])

    // Use the sorting hook to sort products
    const sortedProducts = sortData(products)

    const {
        currentPage,
        totalPages,
        paginatedItems,
        handlePageChange,
        startIndex,
        endIndex,
    } = usePagination(sortedProducts, ITEMS_PER_PAGE)

    // === Conditional Renders ===
    if (isFallback) {
        return (
            <>
                <ConnectionWarning />
                {products.length === 0 ? <EmptyState isLoading={false} isFallback={true} /> : null}
            </>
        )
    }

    if (isLoading && !error) {
        return <ProductSkeleton />
    }

    if (!isLoading && products.length === 0) {
        return <EmptyState />
    }

    // === Final Render ===
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <ProductTableHeader toggleSort={toggleSort} getSortIcon={getSortIcon} />
                <tbody>
                    {paginatedItems.map((product) => (
                        <ProductTableRow
                            key={product.id}
                            product={product}
                            isExpanded={isExpanded(product.id)}
                            onToggleExpand={() => toggleExpand(product.id)}
                            onEdit={onEdit}
                            onDelete={(id) => setDeleteId(id)}
                        />
                    ))}
                </tbody>
            </table>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-4 px-4 py-2">
                <div className="text-sm text-muted-foreground">
                    Showing {startIndex}-{endIndex} of {products.length} products
                </div>

                <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>

            <ConfirmDialog
                open={deleteId !== null}
                onOpenChange={(open) => {
                    if (!open) setDeleteId(null)
                }}
                title="Delete Product?"
                description="Are you sure you want to delete this product? This action cannot be undone."
                onConfirm={() => {
                    if (deleteId !== null) {
                        onDelete(deleteId)
                        setDeleteId(null)
                    }
                }}
            />

        </div>
    )
}
