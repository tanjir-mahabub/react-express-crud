import React from "react"

interface HeaderConfig {
    key: string
    label: string
    align?: "left" | "center" | "right"
    sortable?: boolean
    width?: string
}

interface ProductTableHeaderProps {
    toggleSort: (field: string) => void
    getSortIcon: (field: string) => React.ReactNode
}

const headers: HeaderConfig[] = [
    { key: "expand", label: "", width: "w-10", sortable: false }, // For expansion/collapse icon
    { key: "title", label: "Product", align: "left" },
    { key: "category", label: "Category", align: "left" },
    { key: "brand", label: "Brand", align: "left" },
    { key: "price", label: "Price", align: "right" },
    { key: "rating", label: "Rating", align: "center" },
    { key: "stock", label: "Stock", align: "right" },
    { key: "actions", label: "Actions", align: "center", sortable: false },
]

export default function ProductTableHeader({
    toggleSort,
    getSortIcon,
}: ProductTableHeaderProps) {
    return (
        <thead>
            <tr className="bg-gray-50 border-b">
                {headers.map(({ key, label, align = "left", sortable = true, width }) => {
                    const alignmentClass =
                        align === "right"
                            ? "text-right justify-end"
                            : align === "center"
                                ? "text-center justify-center"
                                : "text-left"

                    const classes = `px-4 py-3 font-medium text-gray-700 ${sortable ? "cursor-pointer" : ""
                        } ${width ?? ""} text-${align}`

                    return (
                        <th
                            key={key}
                            className={classes}
                            onClick={() => sortable && toggleSort(key)}
                        >
                            <div className={`flex items-center ${alignmentClass}`}>
                                {label} {sortable && getSortIcon(key)}
                            </div>
                        </th>
                    )
                })}
            </tr>
        </thead>
    )
}
