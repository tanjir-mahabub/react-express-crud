type Props = {
    keys: string[];
};

export default function ProductTableHeader({ keys }: Props) {
    return (
        <tr>
            {keys.filter(key => key !== "reviews").map((key) => (
                <th key={key} className="px-4 py-3 text-left capitalize">
                    {key}
                </th>
            ))}
            <th className="px-4 py-3 text-center">Actions</th>
        </tr>
    );
}
