'use client';

import { useState } from "react";
import { use } from "react";
import { getProducts } from "../lib/actions/product";
import type { Product } from "../types/Product";
import UpdateProduct from "./UpdateProduct";
import DeleteButton from "./DeleteProduct";

const ProductJSON = getProducts();
const PRODUCTS_PER_PAGE = 6;

export default function ProductTable() {
    const products = use(ProductJSON);
    const [currentPage, setCurrentPage] = useState(1);
    const [editingId, setEditingId] = useState<number | null>(null);

    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const currentProducts = products.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-md">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-6 text-center">Manage Products</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm">
                    <thead className="bg-indigo-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-left">Title</th>
                            <th className="px-4 py-3 text-center">Description</th>
                            <th className="px-4 py-3 text-left">Price</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((p: Product) => (
                            <tr key={p.id} className="border-t">
                                {editingId === p.id ? (
                                    <td colSpan={4}>
                                        <UpdateProduct product={p} onCancel={() => setEditingId(null)} />
                                    </td>
                                ) : (
                                    <>
                                        <td className="px-4 py-3 font-medium text-gray-900 text-left">{p.title}</td>
                                        <td className="px-4 py-3 text-gray-600">{p.description}</td>
                                        <td className="px-4 py-3 text-indigo-600 font-semibold">${p.price}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-center items-center gap-2">
                                                <button
                                                    onClick={() => p.id && setEditingId(p.id)}
                                                        className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 cursor-pointer"
                                                >
                                                    Edit
                                                </button>
                                                <DeleteButton productId={String(p.id)} />
                                            </div>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center mt-6 space-x-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-700 font-medium self-center">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
