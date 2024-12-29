import MainNavbar from "@/layout/MainNavbar";
import { Check, Heart, Plus, Star } from "lucide-react";
import priceBanner from "./../../../assets/priceBanner.png";
import { Button } from "@/components/ui/button";
import ChapterAccordion from "./ChapterAccordian";
import { useGetFullCoursePublicDetailsQuery } from "./CourseDetailsApiSlice";

export interface IChapter {
    chapterTitle: string;
    lessons: {
        lessonTitle: string;
        _id: string;
    }[];
    _id: string;
}

interface IFullCourseData {
    thumbnail: {
        public_id: string;
        url: string;
    };
    _id: string;
    title: string;
    description: string;
    createdBy: {
        _id: string;
        legalName: string;
    };
    courseState: string;
    boughtCount: number;
    prerequisites: string[];
    demoVideos: string;
    chapters: IChapter[];
    category: string;
    estimatedPrice: number;
    level: string;
    price: number;
    benefits: string[];
    demoVideoKey: string;
    updatedAt: string; // ISO date string
    rating?: number;
}

const FullCouseDetalsPage = () => {
    const { data } = useGetFullCoursePublicDetailsQuery({
        courseId: "6766c2f1040682b6bfe3b1b3",
    });

    const fullCourseData: IFullCourseData = data?.fullCourseData;
    const formatDateToYYYYMM = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1);
        return `${month}/${year}`;
    };

    const calculateLessonCount = (chapters: IChapter[]) => {
        let lessonCount = 0;
        chapters.forEach((chapter) => (lessonCount += chapter.lessons.length));
        return lessonCount;
    };

    if (!fullCourseData) return;
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
                        <div className="col-span-5">
                            <div className="w-[26rem] h-[14.625rem] border-2 border-zinc-500 rounded-base overflow-hidden mx-auto">
                                <img
                                    src={fullCourseData.thumbnail.url}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* detals and buy section */}
                    <div className="grid grid-cols-12">
                        {/* cosurse more detasils section */}
                        <div className="border col-span-7 font-publicSans">
                            {/* mdeta data */}
                            <div className="border-x border-black grid grid-cols-3 justify-center text-center bg-white">
                                <div className="py-5">
                                    Last updated:{" "}
                                    {formatDateToYYYYMM(
                                        fullCourseData.updatedAt
                                    )}
                                </div>

                                <div className="py-5 border-x border-black">
                                    {calculateLessonCount(
                                        fullCourseData.chapters
                                    )}{" "}
                                    Lectures
                                </div>

                                <div className="flex gap-1 justify-center items-center ">
                                    {fullCourseData.rating ? (
                                        <>
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
                                        </>
                                    ) : (
                                        <p>No rating yet</p>
                                    )}
                                </div>
                            </div>

                            {/* benifits and prerequsite */}
                            <div className="border h-m-96 border-black bg-white p-5">
                                {/* benifite */}
                                <div>
                                    <p className="font-semibold mb-1">
                                        What you will learn
                                    </p>
                                    <div className="ms-3 text-black/80">
                                        {fullCourseData.benefits.map(
                                            (benifit, index: number) => (
                                                <p
                                                    key={index}
                                                    className="flex gap-2 items-baseline mb-1"
                                                >
                                                    <Check size={14} />

                                                    {benifit}
                                                </p>
                                            )
                                        )}
                                    </div>
                                </div>

                                {/* prerequites */}
                                <div>
                                    <p className="font-semibold mt-3 mb-1">
                                        Prerequisites
                                    </p>
                                    <div className="ms-3 text-black/80">
                                        {fullCourseData.prerequisites.map(
                                            (benifit, index) => (
                                                <p
                                                    key={index}
                                                    className="flex gap-2 items-baseline mb-1"
                                                >
                                                    <Plus size={14} />

                                                    {benifit}
                                                </p>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* cousecontent */}
                            <div className="p-5 bg-zinc-100 border-x border-b border-black rounded-b-base">
                                <p className="font-semibold">Course contents</p>
                                <div>
                                    <ChapterAccordion
                                        chapters={
                                            fullCourseData.chapters as IChapter[]
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/* buy and add to cart */}
                        <div className="border-e border-b rounded-br-base h-fit border-black bg-white col-span-5 py-7 px-12 font-publicSans">
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
                                    className="bg-[#ffdc58] w-full p-7 font-semibold text-xl"
                                    size="lg"
                                >
                                    Add to cart
                                </Button>

                                <Button
                                    size="lg"
                                    className="bg-zinc-100 p-7 hover:bg-[#fd6182]"
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
