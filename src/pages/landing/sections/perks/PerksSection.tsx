import quizesArt from "./../../../../assets/quizesArt.png";
import communityArt from "./../../../../assets/communityArt.png";
import certificationArt from "./../../../../assets/certificationArt.png";

const PerksSection = () => {
    const primaryPerks: {
        color: string;
        icon: string;
        heading: string;
        description: string;
    }[] = [
        {
            color: "#a388ee",
            icon: quizesArt,
            heading: "Quizzes",
            description:
                "Interactive quizzes to test your knowledge and track progress.",
        },
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
        <div className=" mx-10 lg:mx-60   py-16 font-publicSans border border-red-400">
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
                {primaryPerks.map((perk, index) => (
                    <div
                        key={index}
                        className={`bg-[${perk.color}] border-4 border-black h-fit rounded-base  p-8 text-center`}
                    >
                        <div className="size-20 mx-auto">
                            <img src={perk.icon} alt={perk.heading} />
                        </div>
                        <h5 className="font-semibold mt-2">{perk.heading}</h5>
                        <p className="mt-3">{perk.description}</p>
                    </div>
                ))}
            </div>

            {/* ai feature */}
            <div className="border-4 border-black mt-5 rounded-base">
                {/* content */}
                <div>
                    {/* info */}
                    <div>
                        <h3>Get Instant Answers, Right from the Source!</h3>
                        <p>
                            Our advanced AI helps you ask questions directly
                            related to a video’s content. Whether it's a
                            lecture, tutorial, or presentation, the AI analyzes
                            the teacher's explanations and context from the
                            video to provide accurate, on-point answers
                        </p>
                    </div>

                    {/* insigt demo */}
                    <div>
                        <p>
                            Simply type your question, and the AI will refer to
                            the teacher's statements in the video
                        </p>
                        <p>
                            Get reliable and clear responses, saving you time
                            and boosting your understanding.
                        </p>
                    </div>
                </div>

                {/* ai example image */}
                <div></div>
            </div>
        </div>
    );
};

export default PerksSection;
