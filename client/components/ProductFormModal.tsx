"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ProductForm from "@/components/product-form/ProductForm"

export default function ProductFormModal() {
  const [open, setOpen] = useState(false)

  const handleFormSuccess = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <Plus className="mr-2 h-5 w-5" />
          Create Product
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Create New Product</DialogTitle>
          <DialogDescription className="text-gray-600">
            Fill in the details below to create a new product listing.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <ProductForm onSuccess={handleFormSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
