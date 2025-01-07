import { Star } from "lucide-react";
import React, { useState } from "react";

type Props = {
    rating: number | null;
    setRating: (index: number) => void;
};

const ReviewStars: React.FC<Props> = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState<number>(rating ? rating : 0);
    return (
        <div
            className="flex justify-center gap-2 "
            onMouseLeave={() => setHoverRating(rating || 0)}
        >
            {Array.from({ length: 5 }).map((_, index) => (
                <p
                    key={index}
                    onMouseEnter={() => setHoverRating(index + 1)}
                    onClick={() => setRating(index + 1)}
                >
                    <Star
                        className={`${
                            index < hoverRating && "fill-yellow-300"
                        }`}
                    ></Star>
                </p>
            ))}
        </div>
    );
};

export default ReviewStars;
