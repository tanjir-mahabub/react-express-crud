import { useState } from "react";
import { Suspense } from "react";
import CreateProduct from "./components/CreateProduct";
import ProductTable from "./components/ProductView/ProductTable";

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-extrabold text-center text-indigo-800 mb-8 drop-shadow-sm">
        REACTJS CRUD APP
      </h1>

      <div className="max-w-full mx-auto text-center">
        <button
          onClick={() => setShowModal(true)}
          className="mb-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Create Product
        </button>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div
              className="bg-white rounded-lg shadow-lg relative max-w-[90vw] w-[90vw] max-h-[90vh] overflow-auto p-6"
              style={{ maxWidth: "90vw", width: "90vw", maxHeight: "90vh" }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold leading-none"
                aria-label="Close modal"
              >
                ✕
              </button>
              <CreateProduct onSuccess={() => setShowModal(false)} />
            </div>
          </div>
        )}

        <Suspense fallback={<p className="text-lg text-gray-600 animate-pulse">Loading products...</p>}>
          <ProductTable />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
