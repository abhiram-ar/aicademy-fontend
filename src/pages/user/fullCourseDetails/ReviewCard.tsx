import React from "react";
import noUserProfile from "@/assets/NoUserProfile.png";
import { Star } from "lucide-react";

type IReview = {
    _id: string;
    courseId: string;
    createdBy: {
        profilePicture: {
            url: string;
        };

        firstName: string;
        lastName?: string;
    };
    createdAt: string;
    rating: number;
    review: string;
    updatedAt: string;
};

const ReviewCard: React.FC<{ review: IReview }> = ({ review }) => {
    return (
        <div className="border-2 border-black p-5 font-publicSans rounded-base bg-white/90 min-w-60">
            {/* header */}
            <div className="flex gap-3 items-center">
                {/* user profiel */}
                <div className="bg-zinc-300 size-12 rounded-full border border-black overflow-hidden">
                    <img
                        src={noUserProfile}
                        className="w-full h-full object-cover"
                        alt=""
                    />
                </div>
                <div>
                    <p>
                        {review.createdBy.firstName +
                            " " +
                            review.createdBy.lastName}
                    </p>
                    <div className="flex">
                        {Array.from({
                            length: 5,
                        }).map((_, index) => (
                            <p key={index}>
                                <Star
                                    className={`w-4 stroke-yellow-800  me-0.5  ${
                                        index + 1 <= review.rating &&
                                        "fill-yellow-300"
                                    }`}
                                />{" "}
                                <span></span>
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-2">{review.review}</div>
        </div>
    );
};

export default ReviewCard;
