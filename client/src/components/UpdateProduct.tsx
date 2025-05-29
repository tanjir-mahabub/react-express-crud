'use client';

import { useState } from "react";
import { updateProduct } from "../lib/actions/product";
import type { Product } from "../types/Product";

type Props = {
    product: Product;
    onCancel: () => void;
};

export default function UpdateProduct({ product, onCancel }: Props) {
    const [title, setTitle] = useState(product.title);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price.toString());

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', String(product.id));
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        await updateProduct(formData);
        onCancel();
    };

    return (
        <form onSubmit={handleUpdate} className="space-y-2 p-3">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                required
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.01"
                className="w-full px-3 py-2 border rounded"
                required
            />
            <div className="flex gap-2">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                    Save
                </button>
                <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                    Cancel
                </button>
            </div>
        </form>
    );
}
