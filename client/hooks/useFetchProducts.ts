import { useEffect, useState } from "react"
import { ProductType } from "@/lib/validation/productSchema"
import { fetchProducts } from "@/lib/api/products"
import { useOnlineStatus } from "@/hooks/useOnlineStatus"

export const useFetchProducts = (fallbackProducts: ProductType[] = []) => {
    const [products, setProducts] = useState<ProductType[]>(fallbackProducts)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const isOnline = useOnlineStatus()

    const fetch = async () => {
        if (!isOnline) {
            setError("You are offline")
            setProducts(fallbackProducts)
            return
        }

        setIsLoading(true)
        try {
            const result = await fetchProducts()
            setProducts(result)
            setError(null)
        } catch (err) {
            setProducts(fallbackProducts)
            setError(err instanceof Error ? err.message : String(err))
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetch()
    }, [isOnline])

    return { products, isLoading, error, setProducts, refetch: fetch }
}
