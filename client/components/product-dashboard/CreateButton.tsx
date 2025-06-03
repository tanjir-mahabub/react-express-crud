// components/CreateButton.tsx
"use client"

import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CreateButtonProps {
    onClick: () => void
    isLoading: boolean
}

export default function CreateButton({ onClick, isLoading }: CreateButtonProps) {
    return (
        <Button
            size="lg"
            onClick={onClick}
            disabled={isLoading}
            className="w-full sm:w-auto bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Loading...
                </>
            ) : (
                <>
                    <Plus className="mr-2 h-5 w-5" />
                    Create Product
                </>
            )}
        </Button>
    )
}
