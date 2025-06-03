import { Star } from "lucide-react"

export function RatingStars({ rating }: { rating: number }) {
    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-3 w-3 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
            ))}
            <span className="ml-1 text-xs text-gray-600">{rating.toFixed(1)}</span>
        </div>
    )
}
