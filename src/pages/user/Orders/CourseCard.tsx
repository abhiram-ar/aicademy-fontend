import React from "react";
import CourseCardLong from "../explore/CourseCardLong";
import { Link } from "react-router-dom";
import { ICourse } from "../explore/ExplorePage";

const CourseCard: React.FC<{ course: ICourse }> = ({ course }) => {
    return (
        <div
            key={course._id}
            className="bg-zinc-200 mt-5 rounded-base font-publicSans "
        >
            <Link to={`/explore/course/${course._id}`}>
                <div className="relative z-20">
                    <CourseCardLong courseDetails={course} />
                </div>
            </Link>
            <div className="flex justify-end gap-5 -mt-3 p-2 border border-t-0 border-slate-300 rounded-b-base text-zinc-800 px-5 font-medium relative z-10">
                <button className="hover:underline hover:text-zinc-800">
                    Add review
                </button>
            </div>
        </div>
    );
};

export default CourseCard;
