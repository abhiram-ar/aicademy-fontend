import MainNavbar from "@/layout/MainNavbar";
import HeroSection from "./sections/HeroSection";
import PerksSection from "./sections/perks/PerksSection";
const LandingPage = () => {
    return (
        <>
            <MainNavbar query="" />
            <div className="bg-[#fffbee] w-full">
                <HeroSection />
                <hr className="border-t-4 border-black border-dashed" />
                <PerksSection />
            </div>
        </>
    );
};

export default LandingPage;
