import { useState, useEffect } from "react"
import { toast } from "@/components/ui/use-toast"
import {
    fetchProducts as apiFetchProducts,
    deleteProduct as apiDeleteProduct,
    createProduct as apiCreateProduct,
    updateProduct as apiUpdateProduct,
} from "@/lib/api/products"
import { ProductType } from "@/lib/validation/productSchema"
import { nanoid } from "nanoid"

export const useProducts = () => {
    const [products, setProducts] = useState<ProductType[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isUsingFallback, setIsUsingFallback] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchProducts()
    }, [])

    const fetchProducts = async () => {
        setIsLoading(true)
        try {
            const result = await apiFetchProducts()
            setProducts(result)
            setIsUsingFallback(false)
        } catch (err) {
            console.error("Failed to fetch products:", err)
            setError(err instanceof Error ? err.message : String(err))
        } finally {
            setIsLoading(false)
        }
    }

    const deleteProduct = async (id: number) => {
        await apiDeleteProduct(id)
        setProducts(products.filter(p => p.id !== id))
        toast({ title: "Product deleted successfully." })
    }

    const saveProduct = async (formData: any, editingProduct: ProductType | null) => {
        const productData: ProductType = { id: editingProduct?.id || nanoid(), ...formData }

        if (editingProduct) {
            const updated = await apiUpdateProduct(editingProduct.id, productData)
            setProducts(products.map(p => (p.id === editingProduct.id ? updated : p)))
            toast({ title: "Product updated successfully." })
        } else {
            const created = await apiCreateProduct(productData)
            setProducts([created, ...products])
            toast({ title: "Product created successfully." })
        }
    }

    return {
        products,
        isLoading,
        error,
        isUsingFallback,
        fetchProducts,
        deleteProduct,
        saveProduct,
    }
}
