import React, { useState } from "react";
import ReviewCard from "./ReviewCard";
import { useGetCourseReviewListQuery } from "./CourseDetailsApiSlice";
import { IReview } from "./Types";
import { MessageCircleWarning } from "lucide-react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/components/ui/pagination";

const Reviews: React.FC<{ courseId: string }> = ({ courseId }) => {
    const [page, setPage] = useState(1);
    const { data } = useGetCourseReviewListQuery({ page, limit: 8, courseId });
    return (
        <div className="bg-zinc-100 px-6 py-6 border border-black rounded-base">
            <h3 className=" w-fit px-2 rounded-base font-publicSans font-semibold">
                Reviews
            </h3>
            {data && data.length === 0 && (
                <div className="bg-zinc-200 p-5 text-center font-publicSans mt-2 flex justify-center gap-2 text-zinc-800  rounded-base">
                    <MessageCircleWarning />
                    <p>No reviews yet!</p>
                </div>
            )}

            {data ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-2 gap-3 mt-2">
                    {data.reviews.map((review: IReview) => (
                        <ReviewCard key={review._id} review={review} />
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mt-2 text-transparent">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="border-2 border-zinc-400 p-5 font-publicSans rounded-base bg-zinc-100 min-w-60"
                            >
                                {/* header */}
                                <div className="flex gap-3 items-center animate-pulse">
                                    {/* user profiel */}
                                    <div className="bg-zinc-300 size-12 rounded-full border border-zinc-300 overflow-hidden"></div>
                                    <div>
                                        <p className="bg-zinc-200 rounded-base">
                                            username
                                        </p>
                                        <div className="flex">
                                            <p className="bg-zinc-200 rounded-base">
                                                star star
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 animate-pulse">
                                    <p className="bg-zinc-200 rounded-base">
                                        t1
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* pagination */}
            {data && data.pages > 1 && (
                <Pagination className="mt-5 opacity-40 hover:opacity-100 transition-opacity duration-200">
                    <PaginationContent>
                        {/* {page > 1 && (
                            <PaginationItem className="cursor-pointer">
                                <PaginationPrevious
                                    className="bg-zinc-200"
                                    onClick={() => setPage(page - 1)}
                                />
                            </PaginationItem>
                        )} */}

                        {Array.from({
                            length: data.pages,
                        }).map((_, index) => (
                            <PaginationItem
                                key={index + 1}
                                className="cursor-pointer"
                            >
                                <PaginationLink
                                    className={`bg-zinc-200  ${
                                        index + 1 === page &&
                                        "bg-black text-white"
                                    }`}
                                    onClick={() => setPage(index + 1)}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* {page < data.pages && (
                            <PaginationItem className="cursor-pointer">
                                <PaginationNext
                                    className="bg-zinc-200"
                                    onClick={() => setPage(page + 1)}
                                />
                            </PaginationItem>
                        )} */}
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default Reviews;
