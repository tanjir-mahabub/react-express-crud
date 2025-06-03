// components/ProductModal.tsx
"use client"

import { X, Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductForm from "@/components/product-form/ProductForm"
import { ProductType } from "@/lib/validation/productSchema"
import { useState } from "react"

interface ProductModalProps {
    isOpen: boolean
    isLoading: boolean
    editingProduct: ProductType | null
    onClose: () => void
    onSuccess: (data: any) => void
}

export default function ProductModal({
    isOpen,
    isLoading,
    editingProduct,
    onClose,
    onSuccess,
}: ProductModalProps) {
    const [autofillFn, setAutofillFn] = useState<() => void>(() => () => { })
    const [resetFn, setResetFn] = useState<() => void>(() => () => { })

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-modal-in">
                <div className="flex-shrink-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-xl">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {editingProduct ? "Edit Product" : "Create New Product"}
                        </h2>
                        <p className="text-gray-600">
                            {editingProduct
                                ? "Update the product details below"
                                : "Fill in the details below to create a new product listing."}
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div className="p-6">
                        <ProductForm
                            onSuccess={onSuccess}
                            initialData={editingProduct || undefined}
                            onAutofill={setAutofillFn}
                            onReset={setResetFn}
                        />
                    </div>
                </div>

                <div className="flex-shrink-0 bg-gray-50 border-t px-6 py-4 rounded-b-xl">
                    <div className="flex justify-end space-x-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => resetFn()}
                            className="hover:bg-gray-100 transition-colors"
                        >
                            Reset
                        </Button>
                        {process.env.NODE_ENV === "development" && (
                            <Button
                                type="button"
                                onClick={() => autofillFn()}
                                className="bg-purple-500 hover:bg-purple-600 text-white"
                            >
                                Autofill Mock Data
                            </Button>
                        )}

                        <Button
                            form="product-form"
                            type="submit"
                            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white transition-all"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    {editingProduct ? "Update Product" : "Create Product"}
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
