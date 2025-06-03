import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RowExpandButton({ isExpanded }: { isExpanded: boolean }) {
    return (
        <Button variant="ghost" size="icon" className="h-6 w-6">
            <ChevronRight className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
        </Button>
    )
}
