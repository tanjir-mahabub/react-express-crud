import { useState, useEffect } from "react"
import { ProductType } from "@/lib/validation/productSchema"

export function useProductModal() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [editingProduct, setEditingProduct] = useState<ProductType | null>(null)

    const openModal = async (product: ProductType | null = null) => {
        setEditingProduct(product)
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 800))
        setIsLoading(false)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setEditingProduct(null)
    }

    useEffect(() => {
        document.body.style.overflow = isModalOpen ? "hidden" : "unset"
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isModalOpen])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal()
        }
        if (isModalOpen) window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isModalOpen])

    return {
        isModalOpen,
        isLoading,
        editingProduct,
        openModal,
        closeModal,
        setIsLoading,
        setEditingProduct,
    }
}
