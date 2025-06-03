import { useState, useCallback } from "react"

export function useRowExpansion<T extends string | number>() {
    const [expandedRows, setExpandedRows] = useState<Record<T, boolean>>({} as Record<T, boolean>)

    const isExpanded = useCallback(
        (rowId: T) => !!expandedRows[rowId],
        [expandedRows]
    )

    const toggleExpand = useCallback((rowId: T) => {
        setExpandedRows((prev) => ({
            ...prev,
            [rowId]: !prev[rowId],
        }))
    }, [])

    const collapseAll = useCallback(() => {
        setExpandedRows({} as Record<T, boolean>)
    }, [])

    return {
        expandedRows,
        isExpanded,
        toggleExpand,
        collapseAll,
    }
}
