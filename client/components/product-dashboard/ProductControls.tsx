import React from "react"
import CreateButton from "@/components/product-dashboard/CreateButton"
import SearchBar from "@/components/product-dashboard/SearchBar"

interface ProductControlsProps {
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    onCreateClick: () => void
    isLoading: boolean
}

export function ProductControls({
    searchTerm,
    setSearchTerm,
    onCreateClick,
    isLoading,
}: ProductControlsProps) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <CreateButton onClick={onCreateClick} isLoading={isLoading} />
            <SearchBar
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 md:w-80"
            />
        </div>
    )
}
