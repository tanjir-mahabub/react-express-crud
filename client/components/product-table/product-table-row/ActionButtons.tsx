import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ActionButtons({ product, onEdit, onDelete }: any) {
    return (
        <div className="flex items-center justify-center space-x-2">
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
    )
}
