import { toast } from "@/components/ui/use-toast"
import {
    deleteProduct,
    createProduct,
    updateProduct,
} from "@/lib/api/products"
import { ProductType } from "@/lib/validation/productSchema"

interface UseProductActionsParams {
    setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>
    closeModal: () => void
    editingProduct: ProductType | null
    setIsLoading: (loading: boolean) => void
    refetch?: () => Promise<void>
}

export function useProductActions({
    setProducts,
    closeModal,
    editingProduct,
    setIsLoading,
    refetch
}: UseProductActionsParams) {

    const handleDeleteProduct = async (productId: number) => {        
        try {
            await deleteProduct(productId)
            setProducts((prev) => prev.filter((p) => p.id !== productId))
            toast({
                title: "Success!",
                description: "Product deleted successfully.",
                duration: 5000,
            })
        } catch (err) {
            console.error("Error:", err)
            toast({
                title: "Error",
                description: err instanceof Error ? err.message : String(err),
                variant: "destructive",
            })
        }
    }

    const handleFormSuccess = async (formData: any) => {
        setIsLoading(true)
        try {
            const productData: ProductType = editingProduct
                ? { id: editingProduct.id, ...formData }
                : { ...formData }

            if (editingProduct) {
                const updatedProduct = await updateProduct(editingProduct.id, productData)
                setProducts((prev) =>
                    prev.map((p) => (p.id === editingProduct.id ? updatedProduct : p))
                )
                await refetch?.()
                toast({
                    title: "Success!",
                    description: "Product updated successfully.",
                    duration: 5000,
                })
            } else {
                const newProduct = await createProduct(productData)
                setProducts((prev) => [newProduct, ...prev])
                await refetch?.()
                toast({
                    title: "Success!",
                    description: "Product created successfully.",
                    duration: 5000,
                })
            }
            closeModal()
        } catch (err: any) {
            console.error("Error:", err)
            if (err.message?.includes("409")) {
                toast({
                    title: "Conflict",
                    description: "A product with this SKU already exists. Please use a different SKU.",
                    variant: "destructive",
                })
            } else {
                toast({
                    title: "Error",
                    description: err instanceof Error ? err.message : String(err),
                    variant: "destructive",
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return { handleDeleteProduct, handleFormSuccess }
}
