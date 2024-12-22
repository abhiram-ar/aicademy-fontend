import { useGetFullCourseDetailsQuery } from "@/redux/features/teacher/courseCreationAPIs";
import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";

export interface ICourse {
    _id: string;
    title: string;
    description: string;
    createdBy:string; // Reference to the Teacher model
    courseState?: "draft" | "published" | "unpublished";
    price?: number;
    estimatedPrice?: number;
    thumbnail?: {
        public_id: string;
        url: string;
    };
    demoVideos?: Array<{
        key: string;
        public_url: string;
    }>;
    rating?: number;
    boughtCount?: number;
    category?: string;
    level?: "beginner" | "intermediate" | "advanced";
    benifits?: string[];
    prerequisites?: string[];
    chapters?: Array<{
        chapterTitle: string;
        lessons?: Array<{
            lessonTitle?: string;
            videoKey?: string;
            videoURL?: string;
            videoDuration?: number;
        }>;
    }>;
}


const CourseDraft: React.FC = () => {
    const { id } = useParams();
    const { currentData } = useGetFullCourseDetailsQuery({
        courseId: id,
    });



    console.log("Parnet requestData: ", currentData);
    return (
        <div>
            <Toaster
                position="top-right"
                toastOptions={{
                    className: "",
                    style: {
                        border: "1px solid black",
                        background: "#fffbee",
                        color: "black",
                        fontWeight: 500,
                    },
                }}
            />
            <nav className="w-4/5 mx-auto rounded-base bg-zinc-100 border-2 border-black box-border grid grid-cols-4 overflow-hidden -mt-10 shadow-light">
                <Link
                    to={`/teach/course/draft/${id}/details`}
                    className="hover:bg-zinc-300 text-center p-3 transition-all duration-300"
                >
                    Course Details
                </Link>
                <Link
                    to={`/teach/course/draft/${id}/structure`}
                    className="hover:bg-zinc-300 text-center p-3 transition-all duration-300"
                >
                    Course Structure
                </Link>
                <Link
                    to={`/teach/course/draft/${id}/assets`}
                    className="hover:bg-zinc-300 text-center p-3 transition-all duration-300"
                >
                    Course Assets
                </Link>
                <Link
                    to={`/teach/course/draft/${id}/publish`}
                    className="hover:bg-zinc-300 text-center p-3 transition-all duration-300"
                >
                    Publish
                </Link>
            </nav>
            {currentData?.courseDetails && (
                <Outlet context={currentData.courseDetails as ICourse} />
            )}
        </div>
    );
};

export default CourseDraft;
