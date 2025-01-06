import React from "react";
import priceBanner from "./../../../assets/priceBanner.png";
import { Star } from "lucide-react";
import { ICourse } from "./ExplorePage";
import ImageWithShimer from "./ImageWithShimer";

const CourseCardLong: React.FC<{ courseDetails: ICourse }> = ({
    courseDetails,
}) => {
    return (
        <div className="border border-black overflow-hidden  rounded-base mb-3 flex h-[26rem] w-80 flex-col  lg:h-[11.25rem] lg:w-full lg:flex-row  ">
            {/* image */}
            <div className="h-[11.25rem] w-80 border-e border-black shrink-0">
                <ImageWithShimer src={courseDetails.thumbnail?.url} />
            </div>

            {/* detals */}
            <div className="bg-white h-full w-full p-3 relative">
                <h3 className=" font-semibold font-publicSans">
                    {courseDetails.title}
                </h3>
                <p className="font-publicSans mt-1">
                    {courseDetails.description}
                </p>

                {/* bottom section */}

                <div className="flex justify-between absolute bottom-3 right-3 left-3">
                    {/* left section details */}
                    <div className="text-zinc-500 text-sm ">
                        <p>{courseDetails.createdBy.legalName}</p>

                        <div className="flex justify-start items-center">
                            <p className=" me-1">
                                {courseDetails.rating || "No rating yet"}
                            </p>
                            {courseDetails.rating &&
                                Array.from({
                                    length: Math.floor(courseDetails.rating),
                                }).map((_, index) => (
                                    <Star
                                        key={index}
                                        className="size-4 mt-[1px] stroke-yellow-600 fill-yellow-500 "
                                    />
                                ))}
                        </div>

                        <p>40 lessons • {courseDetails.level}</p>
                    </div>

                    {/* right section - price */}
                    <div className="flex gap-4 justify-center items-center">
                        <div>
                            <p className="font-publicSans text-zinc-500 line-through">
                                {courseDetails.estimatedPrice}
                            </p>
                        </div>
                        <div className="relative w-24 h-9 ">
                            <p className="absolute top-1.5 left-3 z-10 font-publicSans font-medium">
                                ₹{courseDetails.price}
                            </p>
                            <img
                                src={priceBanner}
                                className=" absolute inset-0 z-0"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCardLong;
