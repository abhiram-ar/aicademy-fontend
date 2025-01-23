import { Check, Heart, Play, Plus, Star } from "lucide-react";
import priceBanner from "./../../../assets/priceBanner.png";
import { Button } from "@/components/ui/button";
import ChapterAccordion from "./ChapterAccordian";
import { useGetFullCoursePublicDetailsQuery } from "./CourseDetailsApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ICourse } from "../explore/Types";
import { HashLoader } from "react-spinners";
import Reviews from "./Reviews";
import MoreCourses from "./MoreCourses";
import { useGetUserBoughtCourseListQuery } from "../myLearning/myLearningApiSlice";
import { IFullCourseData, IChapter } from "./Types";
import DemoVideoModal from "./DemoVideoModal";
import { useState } from "react";
import {
    useAddToCartMutation,
    useGetCartQuery,
    useRemoveFromCartMutation,
} from "../cart/cartApiSlice";
import {
    useAddToWishlistMutation,
    useGetWishlistQuery,
    useRemoveFromWishlistMutation,
} from "../wishlist/wishlistApiSlice";

const FullCouseDetalsPage = () => {
    const [showDemoVideo, setShowDemoVideo] = useState(false);
    const user = useSelector((state: RootState) => state.auth.user);
    const navigate = useNavigate();
    const { id } = useParams();
    const { data } = useGetFullCoursePublicDetailsQuery({
        courseId: id,
    });

    console.log(data);

    const { data: userBoughtList } = useGetUserBoughtCourseListQuery(
        {},
        { skip: !user }
    );

    const { data: cartInfo } = useGetCartQuery(undefined, { skip: !user });
    const { data: wislistInfo } = useGetWishlistQuery(undefined, {
        skip: !user,
    });

    const [addToCart] = useAddToCartMutation();
    const [removeFromCart] = useRemoveFromCartMutation();
    const [addToWishlist] = useAddToWishlistMutation();
    const [removeFromWishlist] = useRemoveFromWishlistMutation();

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

    const handleAddToCart = async () => {
        if (!user || !user.userId) {
            return navigate("/login", {
                state: { from: window.location.pathname },
            });
        }

        try {
            const addTocartResult = await addToCart({ courseId: id }).unwrap();
            console.log(`response`, addTocartResult);
        } catch (error) {
            console.error(`error while adding to cart`, error);
        }
    };

    const handleRemoveFromCart = async () => {
        try {
            const addTocartResult = await removeFromCart({
                courseId: id,
            }).unwrap();
            console.log(`response`, addTocartResult);
        } catch (error) {
            console.error(`error while removing cart`, error);
        }
    };

    const handleAddToWishList = async () => {
        try {
            await addToWishlist({ courseId: id }).unwrap();
        } catch (error) {
            console.error("error  while adddign to wishlist", error);
        }
    };
    const handleRemoveFromWishlist = async () => {
        try {
            await removeFromWishlist({ courseId: id });
        } catch (error) {
            console.error("error while removing from wishlist", error);
        }
    };

    const handleShowDemoVideo = () => {
        setShowDemoVideo(true);
        document.body.style.overflow = "hidden";
    };

    if (!fullCourseData)
        return (
            <div className="w-full h-screen flex justify-center items-center">
                <HashLoader color="#fde047" />
            </div>
        );

    return (
        <div>
            {/* body */}
            <DemoVideoModal
                url={
                    fullCourseData
                        ? fullCourseData.demoVideoKey
                              .transcodedVideoMasterFileKey
                        : undefined
                }
                showDemoVideo={showDemoVideo}
                setShowDemoVideo={setShowDemoVideo}
            />
            <div className="bg-paperYellow w-full min-h-screen py-12">
                {/* content */}
                <div className="w-11/12 md:10/12 xl:w-9/12 mx-auto rounded-base">
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
                            <div className="w-full  border-2 border-zinc-500 rounded-base overflow-hidden mx-auto relative">
                                <img
                                    src={fullCourseData.thumbnail.url}
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
                                            {fullCourseData.rating.toFixed(1)}{" "}
                                            <div className="flex">
                                                {Array.from({
                                                    length: Math.floor(
                                                        fullCourseData.rating
                                                    ),
                                                }).map((_, index) => (
                                                    <Star
                                                        key={index}
                                                        className="w-4 stroke-yellow-800 fill-yellow-300 "
                                                    />
                                                ))}
                                            </div>
                                            ({fullCourseData.totalRatingCount})
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
                        <div className="border-e border-b rounded-br-base h-fit border-black bg-white col-span-12 md:col-span-5 py-7 px-12 font-publicSans">
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
                                {user &&
                                userBoughtList &&
                                userBoughtList.boughtCourseList.find(
                                    (course: ICourse) => course._id === id
                                ) ? (
                                    <Button
                                        className="bg-[#fd9745] w-full py-7 px-5 font-semibold text-xl"
                                        size="lg"
                                        onClick={() =>
                                            navigate(`/user/learn/${id}`)
                                        }
                                    >
                                        Go to course
                                    </Button>
                                ) : (
                                    <>
                                        {user &&
                                        cartInfo &&
                                        cartInfo.cart.find(
                                            (course: ICourse) =>
                                                course._id === id
                                        ) ? (
                                            <Button
                                                className="bg-[#fd9745] w-full py-7 px-5 font-semibold text-xl"
                                                size="lg"
                                                onClick={handleRemoveFromCart}
                                            >
                                                Remove from cart
                                            </Button>
                                        ) : (
                                            <Button
                                                className="bg-[#ffdc58] w-full p-7 font-semibold text-xl"
                                                size="lg"
                                                onClick={handleAddToCart}
                                            >
                                                Add to cart
                                            </Button>
                                        )}

                                        {user ? (
                                            wislistInfo &&
                                            wislistInfo.wishlist.find(
                                                (course: ICourse) =>
                                                    course._id === id
                                            ) ? (
                                                <Button
                                                    onClick={
                                                        handleRemoveFromWishlist
                                                    }
                                                    size="lg"
                                                    variant="reverse"
                                                    className="p-7 bg-[#fd6182]"
                                                >
                                                    <Heart className="fill-black" />
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={
                                                        handleAddToWishList
                                                    }
                                                    size="lg"
                                                    className="bg-zinc-100 p-7 hover:bg-[#fd6182]"
                                                >
                                                    <Heart className="fill-black" />
                                                </Button>
                                            )
                                        ) : (
                                            <Button
                                                onClick={handleAddToWishList}
                                                size="lg"
                                                className="bg-zinc-100 p-7 hover:bg-[#fd6182]"
                                            >
                                                <Heart className="fill-black" />
                                            </Button>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-9/12 mx-auto rounded-base mt-10">
                    <Reviews courseId={id as string} />
                </div>
                <div className="w-9/12 mx-auto rounded-base mt-10">
                    <MoreCourses
                        category={fullCourseData?.category}
                        currentCourseId={fullCourseData._id}
                    />
                </div>
            </div>
        </div>
    );
};

export default FullCouseDetalsPage;
