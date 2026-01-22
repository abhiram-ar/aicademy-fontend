import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <div className="w-11/12 lg:w-10/12 xl:w-8/12 mx-auto grid grid-cols-10 gap-10 py-16 mb-4 ">
            <div className="col-span-10 md:col-span-6 lg:col-span-6 pt-2 md:pt-10">
                <div className="w-fit h-[25rem]">
                    <h1 className="font-RedHat text-2xl md:text-4xl xl:text-[3rem] leading-none font-extrabold w-fit">
                        Revolutionize Learning
                        <br /> with Adaptive Intelligence.
                    </h1>
                    <p className="font-publicSans text mt-5 font-medium xl:w-[30rem]">
                        Experience a powerful LMS that blends advanced Al with{" "}
                        robust tools for seamless leaming. Whether you're a
                        student aiming for mastery, an educator designing
                        impactful courses, or an organization streamlining
                        training, our LMS empowers you to achieve more with
                        smart, efficient, and engaging solutions.
                    </p>
                    <div className="font-publicSans mt-16 w-fit">
                        <p className="my-2">
                            Discover the future of Learning-Today
                        </p>
                        <Link to="/explore">
                            <Button
                                size="lg"
                                className="h-14 px-8 text-[1.1rem]"
                            >
                                Explore courses
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="col-span-10 md:col-span-4 lg:col-span-4 h-[30rem] xl:w-[35rem] hidden sm:block">
                <img
                    src="/hero-art-optimized.webp"
                    className="object-contain w-full h-full"
                    alt="Photo of a student learning"  
                />
            </div>
        </div>
    );
};

export default HeroSection;
