'use client';

import { useState } from "react";
import { createProduct } from "../lib/actions/product";

export const createProductAction = async (formData: FormData) => {
    "use server";
    await createProduct(formData);
};

export default function CreateProduct() {
    const [message, setMessage] = useState("");

    const handleSubmit = async (formData: FormData) => {
        await createProductAction(formData);
        setMessage("✅ Product created successfully!");
    };

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 my-8">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">Create New Product</h2>

            <form action={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    required
                    step="0.01"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
                >
                    Create Product
                </button>
            </form>

            {message && <p className="text-green-600 text-sm mt-4 text-center">{message}</p>}
        </div>
    );
}
