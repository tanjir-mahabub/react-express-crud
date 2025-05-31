type Props = {
    keys: string[];
};

export default function ProductTableHeader({ keys }: Props) {
    return (
        <tr>
            {keys.filter(key => key !== "reviews" && key !== "meta").map((key) => (
                <th key={key} className="px-4 py-3 text-center capitalize">
                    {key}
                </th>
            ))}
            <th className="px-4 py-3 text-center">Barcode</th>
            <th className="px-4 py-3 text-center">QR Code</th>
            <th className="px-4 py-3 text-center">Actions</th>
        </tr>
    );
}
