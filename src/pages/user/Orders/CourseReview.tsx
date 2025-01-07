import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    useAddCourseReviewMutation,
    useGetCourseReviewQuery,
} from "./OrderPageApiSlice";
import ReviewStars from "./ReviewStars";
import { useRef, useState } from "react";
import { Pen, Star } from "lucide-react";

const CourseReview = ({ courseId }: { courseId: string }) => {
    const { data } = useGetCourseReviewQuery({ courseId });
    const [rating, setRating] = useState<number | null>(null);
    const dialogOpenRef = useRef<HTMLButtonElement>(null);
    const dialogCloseRef = useRef<HTMLButtonElement>(null);
    const [reviewText, setReviewTest] = useState("");

    const [addCourseReview] = useAddCourseReviewMutation();
    const handleAddReview = async () => {
        const reviewData: { rating: number; review?: string } = {
            rating: rating as number,
        };
        if (reviewText) {
            reviewData.review = reviewText;
        }
        console.log(reviewData);

        try {
            await addCourseReview({ ...reviewData, courseId });
            if (dialogCloseRef.current) {
                dialogCloseRef.current.click();
            }
        } catch (error) {
            console.error("error while addding review", error);
        }
    };

    const handleEditReviewClick = () => {
        setRating(data.review.rating);
        setReviewTest(data.review.review);
    };

    if (!data)
        return (
            <p className="w-24 bg-slate-300  rounded-base animate-pulse text-transparent">
                .
            </p>
        );

    return (
        <div>
            {!data.review ? (
                <Dialog>
                    <DialogTrigger>
                        {" "}
                        <p className="hover:underline hover:text-zinc-800">
                            Add review
                        </p>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Course Review</DialogTitle>
                        </DialogHeader>
                        <DialogDescription></DialogDescription>
                        <div className="-mt-2">
                            <p className="text-center font-medium mb-1">
                                Rating
                            </p>
                            <ReviewStars
                                rating={rating}
                                setRating={setRating}
                            />
                            <textarea
                                value={reviewText}
                                className="input-neo w-full mt-2"
                                placeholder="review"
                                onChange={(e) => setReviewTest(e.target.value)}
                            />
                            <div>
                                <button
                                    disabled={rating === null}
                                    onClick={handleAddReview}
                                    className={`disabled:bg-zinc-300 bg-green-300 hover:bg-green-400 px-3 py-1 mt-2 border-2 border-black rounded-base w-fit block ms-auto`}
                                >
                                    Add Review
                                </button>
                            </div>
                        </div>
                        <DialogClose ref={dialogCloseRef} />
                    </DialogContent>
                </Dialog>
            ) : (
                <div className="flex items-center gap-1">
                    <p>Your rating:</p>
                    <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                                key={index}
                                className={`size-5 fil ${
                                    index < data.review.rating &&
                                    "fill-yellow-300"
                                }`}
                            />
                        ))}
                    </div>
                    <Dialog>
                        <DialogTrigger ref={dialogOpenRef}>
                            {" "}
                            <Pen
                                onClick={handleEditReviewClick}
                                className="size-6 bg-zinc-400/80 hover:bg-zinc-400 px-1.5 rounded-base ms-2"
                            />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Course Review</DialogTitle>
                            </DialogHeader>
                            <DialogDescription></DialogDescription>
                            <div className="-mt-2">
                                <p className="text-center font-medium mb-1">
                                    Rating
                                </p>
                                <ReviewStars
                                    rating={rating}
                                    setRating={setRating}
                                />
                                <textarea
                                    className="input-neo w-full mt-2"
                                    placeholder="review"
                                    value={reviewText}
                                    onChange={(e) =>
                                        setReviewTest(e.target.value)
                                    }
                                />
                                <div>
                                    <button
                                        disabled={rating === null}
                                        onClick={handleAddReview}
                                        className={`disabled:bg-zinc-300 bg-green-300 hover:bg-green-400 px-3 py-1 mt-2 border-2 border-black rounded-base w-fit block ms-auto`}
                                    >
                                        Update review
                                    </button>
                                </div>
                            </div>
                            <DialogClose ref={dialogCloseRef} />
                        </DialogContent>
                    </Dialog>
                </div>
            )}
        </div>
    );
};

export default CourseReview;
