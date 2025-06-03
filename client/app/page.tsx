"use client"

import { useState } from "react"
import ProductTable from "@/components/product-table/ProductTable"
import { useFetchProducts } from "@/hooks/useFetchProducts"
import { PageHeader } from "@/components/layout/PageHeader"
import ProductModal from "@/components/product-dashboard/ProductModal"
import { useProductModal } from "@/hooks/useProductModal"
import { useProductActions } from "@/hooks/useProductActions"
import { ProductControls } from "@/components/product-dashboard/ProductControls"

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")

  const {
    products,
    isLoading: isLoadingData,
    error,
    setProducts,
    refetch
  } = useFetchProducts()

  const {
    isModalOpen,
    isLoading,
    editingProduct,
    openModal,
    closeModal,
    setIsLoading,
  } = useProductModal()

  const { handleDeleteProduct, handleFormSuccess } = useProductActions({
    setProducts,
    closeModal,
    editingProduct,
    setIsLoading,
    refetch
  })

  const filteredProducts = products.filter((p) =>
    [p.title, p.brand, p.category, p.sku].some((field) =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <PageHeader
          title="Product Management"
          description="Manage your product listings with ease"
        />

        <ProductControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onCreateClick={() => openModal()}
          isLoading={isLoading}
        />

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <ProductTable
            products={filteredProducts}
            onEdit={openModal}
            onDelete={handleDeleteProduct}
            isLoading={isLoadingData}            
            error={error}
            refetch={refetch}
          />
        </div>

        <ProductModal
          isOpen={isModalOpen}
          isLoading={isLoading}
          editingProduct={editingProduct}
          onClose={closeModal}
          onSuccess={handleFormSuccess}
        />
      </div>
    </main>
  )
}
