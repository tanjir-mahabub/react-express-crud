import { useState } from "react";
import { requiredProductFields, type ProductFieldKey } from "../lib/utils/productFields";

type ProductFormProps = {
    onSubmit: (data: FormData) => void;
    defaultValues?: Partial<Record<ProductFieldKey | string, string>>;
    mode?: "create" | "update";
};

export default function ProductForm({
    onSubmit,
    defaultValues = {},
    mode = "create",
}: ProductFormProps) {
    const [formState, setFormState] = useState(() => {
        const init: Record<string, string> = {};
        for (const key in requiredProductFields) {
            init[key] = defaultValues[key] ?? '';
        }
        if (mode === "update") init["id"] = defaultValues["id"] ?? "";
        return init;
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in formState) {
            formData.append(key, formState[key]);
        }
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold">{mode === "create" ? "Create Product" : "Update Product"}</h2>

            {Object.entries(requiredProductFields).map(([key, config]) => (
                <div key={key}>
                    <label className="block text-sm font-medium text-gray-700">{config.label}</label>
                    <input
                        type={config.type}
                        name={key}
                        value={formState[key]}
                        onChange={handleChange}
                        required={config.required}
                        className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm"
                    />
                </div>
            ))}

            {mode === "update" && (
                <input type="hidden" name="id" value={formState["id"]} />
            )}

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                {mode === "create" ? "Create" : "Update"}
            </button>
        </form>
    );
}
