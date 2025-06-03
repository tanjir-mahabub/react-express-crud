import { ChevronDown, ChevronUp } from "lucide-react"
import { useState, useCallback, useMemo } from "react"

type SortDirection = "asc" | "desc"

export function useProductSort<T>(initialField: keyof T) {
    const [sortField, setSortField] = useState<keyof T>(initialField)
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

    const toggleSort = useCallback(
        (field: keyof T) => {
            if (sortField === field) {
                setSortDirection((dir) => (dir === "asc" ? "desc" : "asc"))
            } else {
                setSortField(field)
                setSortDirection("asc")
            }
        },
        [sortField]
    )

    const getSortIcon = useCallback(
        (field: keyof T) => {
            if (sortField !== field) return null
            return sortDirection === "asc" ? (
                <ChevronUp className="h-4 w-4 ml-1" />
            ) : (
                <ChevronDown className="h-4 w-4 ml-1" />
            )
        },
        [sortField, sortDirection]
    )

    const sortData = useCallback(
        (data: T[]): T[] => {
            return [...data].sort((a, b) => {
                const aVal = a[sortField]
                const bVal = b[sortField]

                // Customize for numeric vs string fields here
                if (typeof aVal === "number" && typeof bVal === "number") {
                    return sortDirection === "asc" ? aVal - bVal : bVal - aVal
                }

                return sortDirection === "asc"
                    ? String(aVal).localeCompare(String(bVal))
                    : String(bVal).localeCompare(String(aVal))
            })
        },
        [sortField, sortDirection]
    )

    return {
        sortField,
        sortDirection,
        toggleSort,
        getSortIcon,
        sortData,
    }
}
