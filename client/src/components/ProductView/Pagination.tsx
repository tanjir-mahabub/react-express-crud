import type { PaginationProps } from "../../types/Pagination";

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    return (
        <div className="flex justify-center mt-6 space-x-4">
            <button
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
                Previous
            </button>
            <span className="text-gray-700 font-medium self-center">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
}