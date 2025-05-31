import UpdateProduct from "../UpdateProduct";
import DeleteButton from "../DeleteProduct";
import type { Product } from "../../types/Product";
import type { ProductTableRowProps } from "../../types/ProductTableRow";
import TruncatedCell from "./TruncatedCell";
import { QRCodeCanvas } from "qrcode.react";
import SafeImage from "../common/SafeImage";

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
                <td colSpan={visibleKeys.length + 3 /* +2 for barcode & qrCode, +1 for actions */}>
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
                            <SafeImage
                                src={product.thumbnail}
                                alt="Product thumbnail"
                                className="w-16 h-16 object-cover"
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

            {/* New barcode column */}
            <td className="px-4 py-3 text-gray-700 max-w-[200px]">
                {product.meta?.barcode ? product.meta.barcode : 'N/A'}
            </td>

            {/* New QR code column */}
            <td className="px-4 py-3 text-center">
                {product.meta?.qrCode ? (
                    <QRCodeCanvas
                        value={product.meta.qrCode}
                        size={64}
                        bgColor="#ffffff"
                        fgColor="#000000"
                        level="Q"
                        includeMargin={false}
                    />
                ) : (
                    'No QR Code'
                )}
            </td>

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
