import UpdateProduct from "./UpdateProduct";
import DeleteButton from "./DeleteProduct";
import type { Product } from "../types/Product";
import type { ProductTableRowProps } from "../types/ProductTableRow";
import TruncatedCell from "./TruncatedCell";
import { QRCodeCanvas } from "qrcode.react";

export default function ProductTableRow({
    product,
    visibleKeys,
    isEditing,
    onEdit,
    onCancel,
}: ProductTableRowProps) {
    if (isEditing) {
        return (
            <tr>
                <td colSpan={visibleKeys.length + 1}>
                    <UpdateProduct product={product} onCancel={onCancel} />
                </td>
            </tr>
        );
    }

    return (
        <tr className="border-t hover:bg-gray-50">
            {visibleKeys.filter(key => key !== "reviews").map((key) => {
                const value = product[key as keyof Product];

                if (key === "thumbnail" || key === "images") {
                    return (
                        <td key={key} className="px-4 py-3 text-center">
                            <img
                                src={String(value)}
                                alt="Thumbnail"
                                className="w-12 h-12 border border-gray-300 object-cover rounded mx-auto"
                            />
                        </td>
                    );
                }

                if (key === "qrCode") {
                    return (
                        <td key={key} className="px-4 py-3 text-center">
                            <QRCodeCanvas
                                value={String(value)} // The string or URL to encode as QR
                                size={64} // Adjust size as needed
                                bgColor="#ffffff"
                                fgColor="#000000"
                                level="Q"
                                includeMargin={false}
                            />
                        </td>
                    );
                }

                return (
                    <td key={key} className="px-4 py-3 text-gray-700 max-w-[200px]">
                        <TruncatedCell text={String(value)}>
                            {key === 'price' ? `$${Number(value).toFixed(2)}` : String(value)}
                        </TruncatedCell>
                    </td>
                );
            })}

            <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                    <button
                        onClick={onEdit}
                        className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                    >
                        Edit
                    </button>
                    <DeleteButton productId={String(product.id)} />
                </div>
            </td>
        </tr>
    );
}
