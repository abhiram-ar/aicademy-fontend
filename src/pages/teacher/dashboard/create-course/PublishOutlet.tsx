import { Check, Heart, Play, Plus, Star } from "lucide-react";
import priceBanner from "./../../../../assets/priceBanner.png";
import { Button } from "@/components/ui/button";
import ChapterAccordion from "./../../../user/fullCourseDetails/ChapterAccordian";
import { useParams } from "react-router-dom";
import { useGetFullCoursePublicDetailsQuery } from "@/pages/user/fullCourseDetails/CourseDetailsApiSlice";
import {
    usePublishCourseMutation,
    useUnPublishCourseMutation,
} from "@/redux/features/teacher/courseCreationAPIs";
import { IFullCourseData, IChapter } from "./Types";
import { useState } from "react";
import DemoVideoModal from "@/pages/user/fullCourseDetails/DemoVideoModal";
import { ErrorBoundary } from "react-error-boundary";

const PublishOutlet = () => {
    const { id } = useParams();
    const { data, refetch } = useGetFullCoursePublicDetailsQuery({
        courseId: id,
    });
    const [publishCourse] = usePublishCourseMutation();
    const [unpublishCourse] = useUnPublishCourseMutation();
    const [showDemoVideo, setShowDemoVideo] = useState(false);

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

    if (!fullCourseData) return <p>loading</p>;
    console.log(`full`, fullCourseData);

    const handlePublishCourse = async () => {
        try {
            await publishCourse({ courseId: id }).unwrap();
            refetch();
        } catch (error) {
            console.log(`error while publishing coursr`, error);
        }
    };

    const handleUnPublishCourse = async () => {
        try {
            await unpublishCourse({ courseId: id }).unwrap();
            refetch();
        } catch (error) {
            console.log(`error while unpublishing coursr`, error);
        }
    };

    const handleShowDemoVideo = () => {
        setShowDemoVideo(true);
        document.body.style.overflow = "hidden";
    };

    return (
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <div>
                {/* body */}
                <DemoVideoModal
                    url={
                        fullCourseData
                            ? fullCourseData?.demoVideoKey
                                  ?.transcodedVideoMasterFileKey
                            : undefined
                    }
                    showDemoVideo={showDemoVideo}
                    setShowDemoVideo={setShowDemoVideo}
                />
                <div className="w-full min-h-screen py-12 mt-5">
                    {/* content */}
                    <div className="w-11/12 md:w-10/12 lg:w-9/12 mx-auto rounded-base">
                        <div className="bg-slate-200 w-full border-2 border-black rounded-base flex justify-between items-center px-5 py-2 mb-3">
                            <p className="font-medium">Preview</p>
                            {fullCourseData.courseState === "draft" && (
                                <Button
                                    onClick={handlePublishCourse}
                                    className="bg-green-400"
                                >
                                    Publish
                                </Button>
                            )}
                            {fullCourseData.courseState === "published" && (
                                <Button
                                    onClick={handleUnPublishCourse}
                                    className="bg-red-400"
                                >
                                    unPublish
                                </Button>
                            )}
                            {fullCourseData.courseState === "blocked" && (
                                <Button
                                    className="bg-red-400 cursor-not-allowed"
                                    variant="noShadow"
                                >
                                    Course is blocked by platform
                                </Button>
                            )}
                        </div>
                        {/* banner */}
                        <div className="bg-[#212121] border border-black  w-full grid grid-cols-12 gap-5 py-10 px-10 md:ps-20  rounded-t-base">
                            {/* banner text */}
                            <div className="text-darkText col-span-12 md:col-span-6 xl:col-span-7 font-publicSans flex flex-col gap-5 ">
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
                            <div className="col-span-12 md:col-span-6 xl:col-span-5">
                                <div className="w-full h-full  border-2 border-zinc-500 rounded-base overflow-hidden mx-auto relative">
                                    <img
                                        src={fullCourseData?.thumbnail?.url}
                                        className="object-cover w-full h-full"
                                    />
                                    <div className="absolute inset-0 flex justify-center items-center">
                                        <Play
                                            className=" stroke-zinc-800 fill-amber-100 size-20 hover:stroke-black hover:fill-amber-200 cursor-pointer hover:scale-105 transition-all duration-150"
                                            onClick={handleShowDemoVideo}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* detals and buy section */}
                        <div className="grid grid-cols-12">
                            {/* cosurse more detasils section */}
                            <div className="border col-span-12 md:col-span-7 font-publicSans">
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
                                                {fullCourseData.totalRatingCount && (
                                                    <>
                                                        (
                                                        {
                                                            fullCourseData.totalRatingCount
                                                        }
                                                        )
                                                    </>
                                                )}
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
                                    <p className="font-semibold">
                                        Course contents
                                    </p>
                                    <div>
                                        <ChapterAccordion
                                            chapters={
                                                fullCourseData?.chapters as IChapter[]
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* buy and add to cart */}
                            <div className="border-e border-b rounded-br-base h-fit border-black bg-white col-span-12 md:col-span-5 py-7 px-5 md:px-12 font-publicSans">
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
                                                    100 || 0
                                            )}
                                            % off
                                        </span>
                                    </p>
                                </div>

                                {/* add to cart and wishlist */}
                                <div className="grid grid-cols-4 gap-2 md:gap-5 my-5">
                                    <Button
                                        className="bg-[#ffdc58] col-span-3 p-7 font-semibold text-xl"
                                        size="lg"
                                    >
                                        Add to cart
                                    </Button>

                                    <Button
                                        size="lg"
                                        className="col-span-1 w-20 p-7 bg-zinc-100 hover:bg-[#fd6182]"
                                    >
                                        <Heart className="fill-black" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default PublishOutlet;
