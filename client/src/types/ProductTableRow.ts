import type { Product } from "./Product";

export type ProductTableRowProps = {
    product: Product;
    visibleKeys: string[];
    isEditing: boolean;
    onEdit: () => void;
    onCancel: () => void;
};