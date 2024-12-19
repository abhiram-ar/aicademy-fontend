import MainNavbar from "@/layout/MainNavbar";
import HeroSection from "./sections/HeroSection";
const LandingPage = () => {
    return (
        <>
            <MainNavbar />
            <div className="bg-[#fffbee] w-full h-screen">
                <HeroSection />
                <hr className="border-t-4 border-black border-dashed"/>
            </div>
        </>
    );
};

export default LandingPage;
