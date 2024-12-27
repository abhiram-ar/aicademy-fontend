import MainNavbar from "@/layout/MainNavbar";
import { Check, Heart, Star } from "lucide-react";
import React from "react";
import priceBanner from "./../../../assets/priceBanner.png";
import { Button } from "@/components/ui/button";
import ChapterAccordian from "./ChapterAccordian";

const mockCourseData = {
    title: "ChatGPT Complete Guide: Learn Generative AI, ChatGPT & More",
    description:
        "25+ Generative AI Tools to 10x Business, Productivity, Creativity | Prompt Engineering, ChatGPT, Custom GPTs, Midjourney",
    createdBy: { legalName: "Abhiram S Sajeev" },
    courseState: "draft",
    boughtCount: 0,
    prerequisites: [
        "ChatGPT: Create content, synthesize information",
        "ChatGPT: Turn your creativity into paid work",
        "Productivity: Achieve your goals faster with ChatGPT",
        "Marketing: Generate targeted content with ChatGPT,  newsletters, and media campaigns!",
        "Soft Skills: Improve your communication, ",
    ],
    demoVideos: [],
    chapters: [
        {
            chapterTitle: "Introduction to JavaScript",
            lessons: [
                {
                    lessonTitle: "What is JavaScript?",
                    videoKey: "6762d2e79e4e6d9d0f66202d/intro-to-js.mp4",
                    _id: "676aa72d30a39b7002646a09",
                },
                {
                    lessonTitle: "Setting up Your Environment",
                    videoKey: "6762d2e79e4e6d9d0f66202d/env-setup.mp4",
                    _id: "676aa72d30a39b7002646a10",
                },
            ],
            _id: "676aa72d30a39b7002646a11",
        },
        {
            chapterTitle: "JavaScript Basics",
            lessons: [
                {
                    lessonTitle: "Variables and Data Types",
                    videoKey:
                        "6762d2e79e4e6d9d0f66202d/variables-data-types.mp4",
                    _id: "676aa72d30a39b7002646a12",
                },
                {
                    lessonTitle: "Control Structures",
                    videoKey: "6762d2e79e4e6d9d0f66202d/control-structures.mp4",
                    _id: "676aa72d30a39b7002646a13",
                },
                {
                    lessonTitle: "Functions and Scope",
                    videoKey: "6762d2e79e4e6d9d0f66202d/functions-scope.mp4",
                    _id: "676aa72d30a39b7002646a14",
                },
            ],
            _id: "676aa72d30a39b7002646a15",
        },
        {
            chapterTitle: "Intermediate JavaScript",
            lessons: [
                {
                    lessonTitle: "Objects and Arrays",
                    videoKey: "6762d2e79e4e6d9d0f66202d/objects-arrays.mp4",
                    _id: "676aa72d30a39b7002646a16",
                },
                {
                    lessonTitle: "Asynchronous JavaScript",
                    videoKey: "6762d2e79e4e6d9d0f66202d/async-js.mp4",
                    _id: "676aa72d30a39b7002646a17",
                },
            ],
            _id: "676aa72d30a39b7002646a18",
        },
        {
            chapterTitle: "Advanced Topics",
            lessons: [
                {
                    lessonTitle: "JavaScript Design Patterns",
                    videoKey: "6762d2e79e4e6d9d0f66202d/design-patterns.mp4",
                    _id: "676aa72d30a39b7002646a19",
                },
                {
                    lessonTitle: "Building a Project with JavaScript",
                    videoKey: "6762d2e79e4e6d9d0f66202d/building-project.mp4",
                    _id: "676aa72d30a39b7002646a20",
                },
            ],
            _id: "676aa72d30a39b7002646a21",
        },
        {
            chapterTitle: "Final Review and Next Steps",
            lessons: [
                {
                    lessonTitle: "Course Summary",
                    videoKey: "6762d2e79e4e6d9d0f66202d/course-summary.mp4",
                    _id: "676aa72d30a39b7002646a22",
                },
                {
                    lessonTitle: "Where to Go From Here?",
                    videoKey: "6762d2e79e4e6d9d0f66202d/next-steps.mp4",
                    _id: "676aa72d30a39b7002646a23",
                },
            ],
            _id: "676aa72d30a39b7002646a24",
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
    benefits: [
        "ChatGPT: Create content,  and learn faster than ever with effective prompt engineering!",
        "ChatGPT: Turn your creativity fresh ideas, reach new audiences, and scale your projects!",
        "Productivity: Achieve your goals faster with ChatGPT, ioritize tasks, and create an optimized daily schedule!",
        "Marketing: Generate targeted content  create ads, newsletters, and media campaigns!",
        "Soft Skills: Improve your communication,problem-solving, and social skills ],",
    ],
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
            <div className="bg-paperYellow w-full min-h-screen py-12">
                
              {/* content */}
                <div className="w-9/12 mx-auto rounded-base">


                    {/* banner */}
                    <div className="bg-[#212121] border border-black  w-full h-80 grid grid-cols-12 py-10 ps-20 pe-10 gap-5 rounded-t-base">
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
                            <div className="border-x border-black grid grid-cols-3 justify-center text-center bg-white">
                                <div className="py-5">
                                    Last updated: {fullCourseData.updatedAt}
                                </div>

                                <div className="py-5 border-x border-black">
                                    {fullCourseData.lessonCount} Lectures
                                </div>

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
                            <div className="border h-m-96 border-black bg-white p-5">
                                {/* benifite */}
                                <div>
                                    <p className="font-medium mb-1">
                                        What you will learn
                                    </p>
                                    <p className="ms-3 ">
                                        {fullCourseData.benefits.map(
                                            (benifit, index) => (
                                                <p
                                                    key={index}
                                                    className="flex gap-2 items-baseline"
                                                >
                                                    <Check size={14} />

                                                    {benifit}
                                                </p>
                                            )
                                        )}
                                    </p>
                                </div>

                                {/* prerequites */}
                                <div>
                                    <p className="font-medium mt-3 mb-1">
                                        Prerequisites
                                    </p>
                                    <p className="ms-3">
                                        {fullCourseData.prerequisites.map(
                                            (benifit, index) => (
                                                <p
                                                    key={index}
                                                    className="flex gap-2 items-baseline"
                                                >
                                                    <Check size={14} />

                                                    {benifit}
                                                </p>
                                            )
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* cousecontent */}
                            <div className="p-5 bg-white border-x border-b border-black rounded-b-base">
                              <p className="font-medium">Contents</p>
                              <div>
                              <ChapterAccordian/>
                              </div>
                            </div>
                        </div>

                        {/* buy and add to cart */}
                        <div className="border-e border-b rounded-br-base h-fit border-black bg-white col-span-5 py-5 px-8">
                            {/* perice and off */}
                            <div className="flex gap-5 items-center">
                                <div className="relative w-32 min-h-12">
                                    <img
                                        src={priceBanner}
                                        alt=""
                                        className="absolute inset-0"
                                    />
                                    <p className="absolute text-2xl font-semibold inset-0 top-1.5 left-4">
                                        ₹{fullCourseData.price}
                                    </p>
                                </div>

                                <p className="font-mediunm text-zinc-400  text-xl">
                                    <span className="line-through">
                                        ₹{fullCourseData.estimatedPrice}
                                    </span>
                                    <span className="ms-3">
                                        {Math.round(
                                            ((fullCourseData.estimatedPrice -
                                                fullCourseData.price) /
                                                fullCourseData.estimatedPrice) *
                                                100
                                        )}
                                        % off
                                    </span>
                                </p>
                            </div>

                            {/* add to cart and wishlist */}
                            <div className="flex gap-5 my-5">
                                <Button
                                    className="bg-[#ffdc58] w-full p-6 font-semibold text-xl"
                                    size="lg"
                                >
                                    Add to cart
                                </Button>

                                <Button
                                    size="lg"
                                    className="bg-zinc-100 p-6 hover:bg-[#fd6182]"
                                >
                                    <Heart className="fill-black" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullCouseDetalsPage;
