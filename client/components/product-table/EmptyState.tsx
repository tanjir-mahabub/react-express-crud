import { AlertTriangle, Loader2 } from "lucide-react"

export default function EmptyState({
    isLoading = false,
    isFallback = false,
    hasData = false,
}: {
    isLoading?: boolean
    isFallback?: boolean
    hasData?: boolean
}) {
    let message = "No products found"
    if (isFallback) {
        message = hasData ? "Showing fallback data." : "No fallback products available."
    }

    return (
        <div className="relative p-6 h-[300px] flex flex-col items-center justify-center space-y-2">
            {isLoading ? (
                <div className="flex items-center mb-2">
                    <Loader2 className="h-6 w-6 animate-spin text-rose-500 mr-2" />
                    <p className="text-gray-500">Loading products...</p>
                </div>
            ) : (
                <p className="text-gray-500 text-lg">{message}</p>
            )}

            {isFallback && !isLoading && (
                <div className="flex items-center text-amber-600 text-sm mt-1">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span>Server unreachable. Showing fallback content.</span>
                </div>
            )}
        </div>
    )
}
