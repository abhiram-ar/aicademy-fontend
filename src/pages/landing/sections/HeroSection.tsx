import { Button } from "@/components/ui/button";
import heroart from "./../../../assets/hero-art.png";

const HeroSection = () => {
    return (
        <div className="mx-60 flex flex-col md:flex-row justify-between items-center  py-16">
            <div>
                <h1 className="font-RedHat text-[3rem] leading-none font-extrabold">
                    Revolutionize Learning
                    <br /> with Adaptive Intelligence.
                </h1>
                <p className="font-publicSans text w-[50ch] mt-5 font-medium">
                    Experience a powerful LMS that blends advanced Al with
                    robust tools for seamless leaming. Whether you're a student
                    aiming for mastery, an educator designing impactful courses,
                    or an organization streamlining training, our LMS empowers
                    you to achieve more with smart, efficient, and engaging
                    solutions.
                </p>
                    <div className="font-publicSans mt-16">
                        <p className="my-2">Discover the future of Learning-Today</p>
                        <Button size="lg">Explore courses</Button>
                    </div>
            </div>
            <div className="w-[35rem] relative -right-14">
                <img src={heroart}  className="" alt="" />
            </div>
        </div>
    );
};

export default HeroSection;
