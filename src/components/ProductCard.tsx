import { useState } from "react"
import { use } from "react"
import { getProducts } from "../lib/actions/product";
import type { Product } from "../types/Product";

const ProductJSON = getProducts();
const PRODUCTS_PER_PAGE = 6;

function ProductCard() {
    const products = use(ProductJSON);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const currentProducts = products.slice(startIdx, startIdx + PRODUCTS_PER_PAGE);

    return (
        <div className="p-8 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
            <h2 className="text-3xl font-semibold text-indigo-700 mb-6 text-center">Our Products</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentProducts.map((p: Product) => (
                    <li
                        key={p.id}
                        className="h-60 flex flex-col justify-between border p-6 rounded-lg shadow hover:shadow-lg transition-shadow bg-gradient-to-r from-indigo-50 to-purple-50"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{p.title}</h3>
                            <p className="text-gray-600 mb-2 line-clamp-3">{p.description}</p>
                        </div>
                        <p className="text-indigo-600 font-semibold text-lg">${p.price}</p>
                    </li>
                ))}
            </ul>

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
    )
}

export default ProductCard;
