import React from "react";
import priceBanner from "./../../../assets/priceBanner.png";
import { Star } from "lucide-react";
const mockCourse = {
    _id: "6766c2f1040682b6bfe3b1b3",
    title: "ChatGPT Complete Guide: Learn Generative AI, Ch atGPT & More",
    description:
        "25+ Generative AI Tools to 10x Business, Productivity, Creativity | Prompt Engineering, ChatGPT, Custom GPTs, Midjourney",
    createdBy: {
        id: "6762d2e79e4e6d9d0f66202d",
        legalName: "Abhiram S Sajeev",
    },
    courseState: "draft",
    boughtCount: 0,
    prerequisites: [
        "all ",
        "new benefit", // Note: Likely a typo, should be "benefit"
    ],
    rating: 4.5,
    demoVideos: [],
    chapters: [
        {
            chapterTitle: "chapter",
            lessons: [
                {
                    lessonTitle: "js lesson",
                    videoKey:
                        "6762d2e79e4e6d9d0f66202d/4442626a5b751352-VID_20240306_184653.mp4",
                    _id: "676aa72d30a39b7002646a08",
                },
                {
                    lessonTitle: "dfgfd",
                    videoKey:
                        "6762d2e79e4e6d9d0f66202d/1b5f2b94d462d74d-vlcsnap-2023-04-30-23h59m45s237.png",
                    _id: "676bdbd989269cb244a7e791",
                },
            ],
            _id: "676aa72d30a39b7002646a07",
        },
    ],
    __v: 0,
    category: "healthAndWellness",
    estimatedPrice: 421,
    level: "intermediate",
    price: 34,
    thumbnail: {
        public_id: "auo9skx6gcs3rxxzkonx",
        url: "http://res.cloudinary.com/dzahlmbyl/image/upload/v1735114313/auo9skx6gcs3rxxzkonx.png",
    },
    benefits: ["asfsf", "sdf"],
    demoVideoKey:
        "6762d2e79e4e6d9d0f66202d/1b5f2b94d462d74d-vlcsnap-2023-04-30-23h59m45s237.png",
};

const CourseCardLong = () => {
    const courseDetails = mockCourse;

    return (
        <div className="border border-black overflow-hidden  rounded-base h-[11.25rem] flex mb-3">
            {/* image */}
            <div className="h-[11.25rem] w-80 border-e border-black shrink-0">
                <img
                    src={courseDetails.thumbnail.url}
                    alt=""
                    className="object-contain"
                />
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
                            <p className=" me-1">{courseDetails.rating || "No rating yet"}</p>
                            {Array.from({
                                length: Math.floor(courseDetails.rating),
                            }).map((_, index) => (
                                <Star key={index} className="size-4 mt-[1px] stroke-yellow-600 fill-yellow-500 " />
                            ))}
                        </div>
                        
                        <p>40 lessons • {courseDetails.level}</p>
                    </div>

                    {/* right section - price */}
                    <div className="flex gap-4 justify-center items-center">
                        <div>
                            <p className="font-publicSans text-zinc-500 line-through">
                                {courseDetails.estimatedPrice}00
                            </p>
                        </div>
                        <div className="relative w-24 h-9 border border-red-200">
                            <p className="absolute top-1.5 left-3 z-10 font-publicSans font-medium">
                                ₹{courseDetails.price}00
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
