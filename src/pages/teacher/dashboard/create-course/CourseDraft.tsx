import { useGetFullCourseDetailsQuery } from "@/redux/features/teacher/courseCreationAPIs";
import React from "react";
import {Link, Outlet, useParams } from "react-router-dom";

const CourseDraft: React.FC = () => {
    const { id } = useParams();
    const { data } = useGetFullCourseDetailsQuery({
        courseId: id,
    });

    console.log(data);

    return (
        <div>
            <nav className="w-4/5 mx-auto rounded-base bg-zinc-100 border border-black box-border grid grid-cols-4 overflow-hidden">
                <Link
                    to={`teach/course/draft/${id}/details`}
                    className="hover:bg-zinc-300 text-center p-3 transition-all duration-300"
                >
                    Course Details
                </Link>
                <Link
                    to={`teach/course/draft/${id}/structure`}
                    className="hover:bg-zinc-300 text-center p-3 transition-all duration-300"
                >
                    Course Structure
                </Link>
                <Link
                    to={`teach/course/draft/${id}/assets`}
                    className="hover:bg-zinc-300 text-center p-3 transition-all duration-300"
                >
                    Course Assets
                </Link>
                <Link
                    to={`teach/course/draft/${id}/publish`}
                    className="hover:bg-zinc-300 text-center p-3 transition-all duration-300"
                >
                    Publish
                </Link>
            </nav>
            {data?.courseDetails && <Outlet context={data.courseDetails} />}
        </div>
    );
};

export default CourseDraft;
