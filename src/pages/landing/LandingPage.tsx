import MainNavbar from "@/layout/MainNavbar";
import HeroSection from "./sections/HeroSection";
import PerksSection from "./sections/perks/PerksSection";
import TestimonialSection from "./sections/testinomials/TestimonialSection";
import Companies from "./sections/AluminiWorkingCompany/Companies";
const LandingPage = () => {
    return (
        <>
            <MainNavbar query="" />
            <div className="bg-[#fffbee] w-full">
                <HeroSection />
                <hr className="border-t-4 border-black border-dashed" />
                <PerksSection />
                <TestimonialSection />
                <Companies />
            </div>
        </>
    );
};

export default LandingPage;
