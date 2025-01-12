import quizesArt from "./../../../../assets/quizesArt.png";
import communityArt from "./../../../../assets/communityArt.png";
import certificationArt from "./../../../../assets/certificationArt.png";
import AIChatExample from "./../../../../assets/AIConvExample.png";
import afforfablePricingArt from "./../../../../assets/AffrodablePricingArt.png";
import { Button } from "@/components/ui/button";

const PerksSection = () => {
    const primaryPerks: {
        color: string;
        icon: string;
        heading: string;
        description: string;
    }[] = [
        // {
        //     color: "#a388ee",
        //     icon: quizesArt,
        //     heading: "Quizzes",
        //     description:
        //         "Interactive quizzes to test your knowledge and track progress.",
        // },
        {
            color: "#88aaee",
            icon: communityArt,
            heading: "Community",
            description:
                "Join a vibrant community of learners and share insights.",
        },
        {
            color: "#ffdc58",
            icon: certificationArt,
            heading: "Certification",
            description:
                "Earn recognized certifications to showcase your skills",
        },
    ];

    return (
        <div className=" mx-10 lg:mx-60   py-16 font-publicSans ">
            <div className="w-fit mx-auto">
                <h3 className="text-4xl text-center font-bold">
                    Your Gateway to Smarter Learning
                </h3>
                <p className="text-center font-normal mt-3">
                    Unlock a world of personalized education, advanced tools,
                    and <br /> collaborative features designed to make learning
                    smarter, faster, and <br /> more effective for everyone.
                </p>
            </div>

            {/* primary perks */}
            <div className=" grid gid-cols-1 md:grid-cols-3 gap-5 mt-10">
                <div
                    className={` border-4 border-black h-full rounded-base  p-8 px-5 lg:px-12 text-center bg-[#a388ee]`}
                >
                    <div className="size-20 mx-auto">
                        <img src={quizesArt} alt="quiz" />
                    </div>
                    <h5 className="font-semibold mt-2">Quizzes</h5>
                    <p className="mt-3">
                        Interactive quizzes to test your knowledge and track
                        progress.
                    </p>
                </div>

                {primaryPerks &&
                    primaryPerks.map((perk, index) => (
                        <div
                            key={index}
                            className={` border-4 border-black h-full rounded-base  p-8 px-5 lg:px-12 text-center bg-[${perk.color}]`}
                        >
                            <div className="size-20 mx-auto">
                                <img src={perk.icon} alt={perk.heading} />
                            </div>
                            <h5 className="font-semibold mt-2">
                                {perk.heading}
                            </h5>
                            <p className="mt-3">{perk.description}</p>
                        </div>
                    ))}
            </div>

            {/* ai feature */}
            <div
                className="border-4 border-black mt-5 rounded-base bg-[#212121] text-darkText px-20 py-5 font-publicSans grid grid-col-3 lg:grid-cols-5 gap-10
            "
            >
                {/* content */}
                <div className="col-span-3 py-12">
                    {/* info */}
                    <div>
                        <h3 className="text-2xl font-bold">
                            Get Instant Answers, Right from the Source!
                        </h3>
                        <p className="text-zinc-300 w-10/12">
                            Our advanced AI helps you ask questions directly
                            related to a video’s content. Whether it's a
                            lecture, tutorial, or presentation, the AI analyzes
                            the teacher's explanations and context from the
                            video to provide accurate, on-point answers
                        </p>
                    </div>

                    {/* insigt demo */}
                    <div className="grid grid-rows-2 w-10/12 mt-12 font-mono">
                        <p className="ms-auto text-right w-3/5 text-[#499FFB]">
                            Simply type your question, and the AI will refer to
                            the teacher's statements in the video
                        </p>
                        <p className="text-left w-3/5 text-[#FFDC58]">
                            Get reliable and clear responses, saving you time
                            and boosting your understanding.
                        </p>
                    </div>
                </div>

                {/* ai example image */}
                <div className="col-span-3 lg:col-span-2">
                    <img
                        src={AIChatExample}
                        className="w-full h-full object-fill"
                        alt=""
                    />
                </div>
            </div>

            {/* pricing */}
            <div className="border-4 font-publicSans border-black mt-5 rounded-base bg-[#a3e636] grid grid-col-2 lg:grid-cols-6 py-14 px-10 lg:px-20 justify-center items-center">
                {/* icon */}
                <div className="col-span-1 w-fit mx-auto  my-auto ">
                    <img
                        src={afforfablePricingArt}
                        className="w-full h-full object-scale-down"
                        alt=""
                    />
                </div>

                <div className=" lg:-ms-24 col-span-1   lg:col-span-5 text-center">
                    <h3 className="font-bold text-2xl">
                        Learning Made Affordable for Everyone
                    </h3>
                    <p className="mt-2 text-center">
                        Access high-quality courses and tools at prices that fit
                        your budget.
                        <br /> Unlock unlimited learning without breaking the
                        bank
                    </p>
                    <Button
                        size="lg"
                        className="text-darkText bg-[#2c312b] mt-5"
                    >
                        Explore Pricing
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PerksSection;
