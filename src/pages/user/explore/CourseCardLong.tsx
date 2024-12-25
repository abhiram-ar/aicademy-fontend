import React from "react";

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
        <div className="border border-black overflow-hidden  rounded-base h-[11.25rem] flex">
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
                <p className="font-publicSans mt-1">{courseDetails.description}</p>

                {/* bottom section */}
                <div>
                    {/* left section details */}
                    <div className="text-zinc-500 text-sm absolute bottom-3">
                        <p>{courseDetails.createdBy.legalName}</p>
                        <p>{courseDetails.rating || "4.5"}</p>
                        <p>40 lessons - {courseDetails.level}</p>
                    </div>

                    {/* right section - price */}
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default CourseCardLong;
