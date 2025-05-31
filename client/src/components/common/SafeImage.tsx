import { useState } from "react";

type SafeImageProps = {
    src?: string;
    alt?: string;
    className?: string;
};

export default function SafeImage({
    src,
    alt = "Image",
    className = "",
}: SafeImageProps) {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return (
            <div
                className={`flex items-center justify-center bg-gray-100 border border-gray-300 text-gray-400 text-xs rounded ${className}`}
            >
                No Image
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setHasError(true)}
        />
    );
}
