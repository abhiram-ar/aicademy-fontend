import { Button } from "@/components/ui/button";
import heroart from "./../../../assets/hero-art.png";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <div className="w-8/12 mx-auto grid grid-2 lg:grid-cols-10 gap-10 py-16 mb-4">
            <div className=" col-span-7 lg:col-span-6 mt-10 ">
                <div>
                    <h1 className="font-RedHat text-[3rem] leading-none font-extrabold">
                        Revolutionize Learning
                        <br /> with Adaptive Intelligence.
                    </h1>
                    <p className="font-publicSans text mt-5 font-medium w-[30rem]">
                        Experience a powerful LMS that blends advanced Al with{" "}
                        robust tools for seamless leaming. Whether you're a
                        student aiming for mastery, an educator designing
                        impactful courses, or an organization streamlining
                        training, our LMS empowers you to achieve more with
                        smart, efficient, and engaging solutions.
                    </p>
                    <div className="font-publicSans mt-16">
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

            <div className="w-[35rem] col-span-3 lg:col-span-4">
                <img src={heroart} className="object-fill" alt="" />
            </div>
        </div>
    );
};

export default HeroSection;
