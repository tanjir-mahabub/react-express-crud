'use client';

import { removeProduct } from "../lib/actions/product";

export const deleteProductAction = async (formData: FormData) => {
    "use server";
    await removeProduct(formData);
};

export default function DeleteButton({ productId }: { productId: string }) {
    return (
        <form action={deleteProductAction}>
            <input type="hidden" name="id" value={productId} />
            <button
                type="submit"
                className="bg-rose-700 text-white px-3 py-1 rounded hover:opacity-80 cursor-pointer"
            >
                Delete
            </button>
        </form>
    );
}
