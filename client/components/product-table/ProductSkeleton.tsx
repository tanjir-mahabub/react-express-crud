import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"

export default function ProductSkeleton() {
    return (
        <div className="relative p-6 h-[300px] flex items-center justify-around">
            <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center mb-4 z-50">
                <Loader2 className="h-6 w-6 animate-spin text-rose-500 mr-2" />
                <p className="text-gray-500">Loading products...</p>
            </div>
            {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <Skeleton className="h-12 w-12 rounded-md" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
