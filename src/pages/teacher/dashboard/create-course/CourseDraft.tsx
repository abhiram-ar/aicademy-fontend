import { useGetFullCourseDetailsQuery } from "@/redux/features/teacher/courseCreationAPIs";
import React from "react";
import { Link, useParams } from "react-router-dom";

const CourseDraft: React.FC = () => {
    const { id } = useParams();
    const { data: courseDetails } = useGetFullCourseDetailsQuery({
        courseId: id,
    });

    console.log(courseDetails);

    return (
        <div>
            <nav className="w-4/5 mx-auto rounded-base bg-zinc-100 border border-black box-border grid grid-cols-4 overflow-hidden">
                <Link className="hover:bg-zinc-300 text-center p-3 transition-all duration-300">Course Basic</Link>
                <Link className="hover:bg-zinc-300 text-center p-3 transition-all duration-300">Course Structure</Link>
                <Link className="hover:bg-zinc-300 text-center p-3 transition-all duration-300">Course Assets</Link>
                <Link className="hover:bg-zinc-300 text-center p-3 transition-all duration-300">Publish</Link>
            
            </nav>
        </div>
    );
};

export default CourseDraft;
