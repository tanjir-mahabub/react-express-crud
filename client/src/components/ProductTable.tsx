'use client';

import { use, useState } from "react";
import { getProducts } from "../lib/actions/product";
import ProductTableHeader from "./ProductTableHeader";
import ProductTableRow from "./ProductTableRow";
import type { Product } from "../types/Product";

const ProductJSON = getProducts();
const PRODUCTS_PER_PAGE = 6;

export default function ProductTable() {
    const products = use(ProductJSON) ?? [];
    const [currentPage, setCurrentPage] = useState(1);
    const [editingId, setEditingId] = useState<number | null>(null);

    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE) || 1;
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const currentProducts = products.slice(start, start + PRODUCTS_PER_PAGE);

    const visibleKeys = products.length > 0
        ? Object.keys(products[0]).filter(key => !['id', 'createdAt', 'updatedAt'].includes(key))
        : [];

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white rounded shadow">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-6 text-center">
                Manage Products
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm">
                    <thead className="bg-indigo-100 text-gray-700">
                        <ProductTableHeader keys={visibleKeys} />
                    </thead>
                    <tbody>
                        {currentProducts.length > 0 ? (
                            currentProducts.map((product: Product) => (
                                <ProductTableRow
                                    key={product.id}
                                    product={product}
                                    visibleKeys={visibleKeys}
                                    isEditing={editingId === product.id}
                                    onEdit={() => setEditingId(product.id)}
                                    onCancel={() => setEditingId(null)}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={visibleKeys.length + 1} className="text-center py-6 text-gray-500">
                                    No products available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-4">
                    <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-gray-700 font-medium self-center">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}
