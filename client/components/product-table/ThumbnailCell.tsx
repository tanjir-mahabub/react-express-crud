export function ThumbnailCell({ src, title, sku }: { src: string; title: string; sku?: string }) {
    return (
        <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-gray-100 mr-3 overflow-hidden flex-shrink-0">
                <img
                    src={src || "/placeholder.svg"}
                    alt={title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg?height=40&width=40"
                    }}
                />
            </div>
            <div>
                <div className="font-medium text-gray-900">{title}</div>
                {sku && (
                    <div className="text-sm text-blue-600 truncate max-w-xs">
                        SKU: {sku}
                    </div>
                )}
            </div>
        </div>
    )
}
