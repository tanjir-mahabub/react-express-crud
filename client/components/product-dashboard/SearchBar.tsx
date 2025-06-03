// components/SearchBar.tsx
"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    className?: string
}

export default function SearchBar({
    value,
    onChange,
    placeholder = "Search products, SKU, brand...",
    className = "",
}: SearchBarProps) {
    return (
        <div className={`relative ${className}`}>
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
                type="search"
                placeholder={placeholder}
                className="pl-8 bg-white/80 backdrop-blur-sm"
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
