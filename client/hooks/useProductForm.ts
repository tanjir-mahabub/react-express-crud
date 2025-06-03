import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productFormSchema, type ProductFormValues } from "@/lib/validation/productFormSchema"
import { toast } from "@/components/ui/use-toast"
import { emptyProduct } from "@/lib/mock-data/emptyProducts"

type ImageInput = {
    type: "url" | "file"
    file: File | null
}

export function useProductForm(initialData?: any, onSuccess?: (data: ProductFormValues) => void) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [newImageUrl, setNewImageUrl] = useState("")
    const [thumbnailPreview, setThumbnailPreview] = useState("")
    const [thumbnailInput, setThumbnailInput] = useState<ImageInput>({ type: "url", file: null })
    const [imagesPreviews, setImagesPreviews] = useState<string[]>([])
    const [imagesInput, setImagesInput] = useState<Array<{ type: "url" | "file"; file: File | null; url: string }>>([])

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues: initialData || emptyProduct,
        mode: "onChange",
    })

    useEffect(() => {
        if (initialData) {
            form.reset({
                ...initialData,
                dimensions: initialData.dimensions || { width: 0, height: 0, depth: 0 },
                meta: initialData.meta || { barcode: "", qrCode: "" },
            })
            setThumbnailPreview(initialData.thumbnail)
            setImagesPreviews(initialData.images || [])
            setImagesInput((initialData.images || []).map((url: string) => ({ type: "url", file: null, url })))
        }
    }, [initialData, form])

    const onSubmit = async (data: ProductFormValues) => {
        setIsSubmitting(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 800))

            const processedData = {
                ...data,
                thumbnail: data.thumbnail.startsWith("blob:") ? "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop" : data.thumbnail,
                images: data.images.map((img) => (img.startsWith("blob:") ? "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop" : img)),
                reviews: initialData?.reviews || [],
            }

            onSuccess?.(processedData)
            if (!initialData) {
                form.reset()
                setThumbnailPreview("")
                setThumbnailInput({ type: "url", file: null })
                setImagesInput([])
                setImagesPreviews([])
            }
        } catch {
            toast({ title: "Error!", description: "Failed to process product. Please try again.", duration: 5000 })
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        form,
        isSubmitting,
        onSubmit,
        newImageUrl,
        setNewImageUrl,
        thumbnailPreview,
        setThumbnailPreview,
        thumbnailInput,
        setThumbnailInput,
        imagesPreviews,
        setImagesPreviews,
        imagesInput,
        setImagesInput,
    }
}
