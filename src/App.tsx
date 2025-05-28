import { Suspense } from "react";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-indigo-800 mb-8 drop-shadow-sm">React CRUD APP</h1>
        <Suspense fallback={<p className="text-lg text-gray-600 animate-pulse">Loading products...</p>}>
          <ProductCard />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
