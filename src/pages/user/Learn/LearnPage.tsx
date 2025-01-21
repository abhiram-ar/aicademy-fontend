import LearnPageNavbar from "./LearnPageNavbar";
import Footer from "@/components/Footer";
import Sibebar from "./Sibebar";
import VideoPlayer from "./VideoPlayer";

const LearnPage = () => {
    return (
        <div>
            <LearnPageNavbar />

            {/* main page */}
            <div className="w-full bg-paperYellow">
                {/* layout grid */}
                <div className="grid grid-cols-12">
                    {/* video & comments container */}
                    <div className="col-span-7 lg:col-span-9">
                        <VideoPlayer />
                    </div>

                    {/* course contentes and chat */}
                    <div className="col-span-5 lg:col-span-3 border-x-2 border-b-2 border-black">
                        <Sibebar />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LearnPage;
