import LearnPageNavbar from "./LearnPageNavbar";
import Footer from "@/components/Footer";
import Sibebar from "./Sibebar";
import VideoPlayer from "./VideoPlayer";
import { useGetBoughtCourseContentQuery } from "./LearnApiSlice";
import { useParams } from "react-router-dom";
import { ICourseContent, ILesson } from "./Types";
import { useEffect, useState } from "react";

const LearnPage = () => {
    const { courseId } = useParams();
    const { data: query } = useGetBoughtCourseContentQuery({ courseId });
    const [currentlyPlaying, setCurrentlyPlaying] = useState<
        ILesson | undefined
    >(undefined);
    console.log(query);

    useEffect(() => {
        if (query) {
            setCurrentlyPlaying(query.content.chapters[0].lessons[0]);
        }
    }, [query]);

    console.log("c", currentlyPlaying);

    return (
        <div>
            <LearnPageNavbar title={query?.content.title} />

            {/* main page */}
            <div className="w-full bg-paperYellow">
                {/* layout grid */}
                <div className="grid grid-cols-12">
                    {/* video & comments container */}
                    <div className="col-span-7 lg:col-span-9">
                        <VideoPlayer lesson={currentlyPlaying} />
                    </div>

                    {/* course contentes and chat */}
                    <div className="col-span-5 lg:col-span-3 border-x-2 border-b-2 border-black">
                        <Sibebar
                            content={query?.content}
                            setCurrentlyPlaying={setCurrentlyPlaying}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LearnPage;
