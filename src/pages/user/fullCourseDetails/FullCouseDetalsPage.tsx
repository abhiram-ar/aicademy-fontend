import MainNavbar from "@/layout/MainNavbar";
import { Star } from "lucide-react";
import React from "react";

const mockCourseData = {
    title: "ChatGPT Complete Guide: Learn Generative AI, ChatGPT & More",
    description:
        "25+ Generative AI Tools to 10x Business, Productivity, Creativity | Prompt Engineering, ChatGPT, Custom GPTs, Midjourney",
    createdBy: { legalName: "Abhiram S Sajeev" },
    courseState: "draft",
    boughtCount: 0,
    benifits: [],
    prerequisites: ["all ", "new benifit"],
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

    updatedAt: "12/2024",
    lessonCount: 40,
    rating: 4.5,
    ratingCount: 100,
};

const FullCouseDetalsPage = () => {
    const fullCourseData = mockCourseData;

    return (
        <div>
            <MainNavbar query="" />

            {/* body */}
            <div className="bg-paperYellow w-full h-screen py-12">
                <div className="w-9/12 border border-black mx-auto rounded-base">
                    {/* banner */}
                    <div className="bg-[#212121] w-full h-80 grid grid-cols-12 py-10 ps-20 pe-10 gap-5">
                        {/* banner text */}
                        <div className="text-darkText col-span-7 font-publicSans flex flex-col gap-5 ">
                            <p className="text-zinc-300">
                                #{fullCourseData.category}
                            </p>
                            <h2 className="text-2xl font-bold">
                                {fullCourseData.title}
                            </h2>
                            <p className="text-zinc-300">
                                {fullCourseData.description}
                            </p>
                            <p className="text-zinc-300">
                                Created By{" "}
                                <span className="underline">
                                    {fullCourseData.createdBy.legalName}
                                </span>
                            </p>
                        </div>

                        {/* banner thumnail and demo */}
                        <div className="col-span-5 -mt-3">
                            <div className="w-full h-full border-2 border-zinc-500 rounded-base overflow-hidden">
                                <img
                                    src={fullCourseData.thumbnail.url}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* detals and buy section */}
                    <div className="grid grid-cols-12">
                        {/* cosurse more detasils section */}
                        <div className="border col-span-7">
                            {/* mdeta data */}
                            <div className="border-e border-black grid grid-cols-3 justify-center text-center bg-white">
                                <div className="py-5">
                                    Last updateed: {fullCourseData.updatedAt}
                                </div>

                                <div className="py-5 border-x border-black">{fullCourseData.lessonCount} Lectures</div>
                                
                                <div className="flex gap-1 justify-center items-center ">
                                    {fullCourseData.rating}{" "}
                                    <div className="flex">
                                        {Array.from({
                                            length: Math.floor(
                                                fullCourseData.rating
                                            ),
                                        }).map((_, index) => (
                                            <Star
                                                key={index}
                                                className="w-4 fill-yellow-300 "
                                            />
                                        ))}
                                    </div>
                                    ({fullCourseData.ratingCount})
                                </div>
                            </div>

                            {/* benifits and prerequsite */}
                            <div></div>

                            {/* cousecontent */}
                            <div></div>
                        </div>

                        {/* buy and add to cart */}
                        <div className="border col-span-5 px-5">df</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullCouseDetalsPage;
