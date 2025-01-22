import { useGetFullCourseDetailsQuery } from "@/redux/features/teacher/courseCreationAPIs";
import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ICourse } from "./course-assets/Types";

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
            <nav className="w-4/5 mx-auto rounded-base bg-zinc-100 border-2 border-black box-border grid grid-cols-4 overflow-hidden -mt-10 shadow-light font-semibold">
                <NavLink
                    to={`/teach/course/draft/${id}/details`}
                    className={({ isActive }) =>
                        `text-center border-r-2 border-black p-3 transition-all duration-300 hover:bg-zinc-300 ${
                            isActive ? "bg-zinc-300 " : ""
                        }`
                    }
                >
                    Course Details
                </NavLink>
                <NavLink
                    to={`/teach/course/draft/${id}/structure`}
                    className={({ isActive }) =>
                        `text-center border-r-2 border-black p-3 transition-all duration-300 hover:bg-zinc-300 ${
                            isActive ? "bg-zinc-300 " : ""
                        }`
                    }
                >
                    Course Structure
                </NavLink>
                <NavLink
                    to={`/teach/course/draft/${id}/assets`}
                    className={({ isActive }) =>
                        `text-center border-r-2 border-black p-3 transition-all duration-300 hover:bg-zinc-300 ${
                            isActive ? "bg-zinc-300 " : ""
                        }`
                    }
                >
                    Course Assets
                </NavLink>
                <NavLink
                    to={`/teach/course/draft/${id}/publish`}
                    className={({ isActive }) =>
                        `text-center p-3 transition-all duration-300 hover:bg-zinc-300 ${
                            isActive ? "bg-zinc-300 " : ""
                        }`
                    }
                >
                    Preview
                </NavLink>
            </nav>
            {currentData?.courseDetails && (
                <Outlet context={currentData.courseDetails as ICourse} />
            )}
        </div>
    );
};

export default CourseDraft;
