"use client"
import { useProductForm } from "@/hooks/useProductForm"
import { ProductFormValues } from "./ui"
import { Form } from "../ui/form"
import { BasicInformation } from "./BasicInformation"
import { PriceInventory } from "./PriceInventory"
import { PhysicalProperties } from "./PhysicalProperties"
import { AditionalInformation } from "./AditionalInformation"
import { Tags } from "./Tags"
import { ImageUploader } from "./ImageUploader"
import { useEffect } from "react"
import { mockProduct } from "@/lib/mock-data/mockProduct"
import { emptyProduct } from "@/lib/mock-data/emptyProducts"

interface ProductFormProps {
  onSuccess?: (data: ProductFormValues) => void
  initialData?: any
  onAutofill?: (fn: () => void) => void
  onReset?: (fn: () => void) => void
}

export default function ProductForm({ onSuccess, initialData, onAutofill, onReset }: ProductFormProps) {  
  const {
    form,
    isSubmitting,
    onSubmit,
    newImageUrl,
    setNewImageUrl,
    thumbnailPreview,
    setThumbnailPreview,
    thumbnailInput,
    setThumbnailInput,
    imagesInput,
    setImagesInput,
    imagesPreviews,
    setImagesPreviews,
  } = useProductForm(initialData, onSuccess)

  // Register autofill trigger
  useEffect(() => {
    if (onAutofill) {
      const autofill = () => {
        form.reset(mockProduct)
        setThumbnailPreview(mockProduct.thumbnail)
        setImagesPreviews(mockProduct.images)
      }
      onAutofill(() => autofill)
    }

    if (onReset) {
      const resetForm = () => {
        form.reset(emptyProduct)
        setThumbnailPreview("")
        setImagesPreviews([])
        setThumbnailInput({ type: "url", file: null })
        setImagesInput([])
      }
      onReset(() => resetForm)
    }
  }, [onAutofill, onReset, form, setThumbnailPreview, setImagesPreviews, setThumbnailInput, setImagesInput])


  return (
    <Form {...form}>
      <form id="product-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <BasicInformation form={form} isSubmitting={isSubmitting} />

        {/* Pricing & Inventory */}
        <PriceInventory form={form} isSubmitting={isSubmitting} />

        {/* Physical Properties */}
        <PhysicalProperties form={form} isSubmitting={isSubmitting} />

        {/* Additional Information */}
        <AditionalInformation form={form} isSubmitting={isSubmitting} />

        {/* Tags */}
        <Tags form={form} isSubmitting={isSubmitting} />        

        {/* Images */}
        <ImageUploader
          {...{
            form,
            isSubmitting,
            newImageUrl,
            setNewImageUrl,
            thumbnailPreview,
            setThumbnailPreview,
            thumbnailInput,
            setThumbnailInput,
            imagesInput,
            setImagesInput,
            imagesPreviews,
            setImagesPreviews,
          }}
        />

        {/* Hidden submit button - controlled by external footer */}
        <button type="submit" className="hidden" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Save Product"}
        </button>
      </form>
    </Form>
  )
}
