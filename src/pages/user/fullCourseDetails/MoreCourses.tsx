import React from "react";
import { useGetCoursesCardDetailsQuery } from "../explore/exploreApiSlice";
import CourseCardLong from "../explore/CourseCardLong";
import { ICourse } from "../explore/Types";
import { Link } from "react-router-dom";

const MoreCourses: React.FC<{ category?: string; currentCourseId: string }> = ({
    category,
    currentCourseId,
}) => {
    const { data } = useGetCoursesCardDetailsQuery({ category: category });

    if (data && data.length <= 1) return null;

    return (
        <div className="bg-zinc-100 px-6 py-6 border border-black rounded-base">
            <h3 className=" w-fit px-2 rounded-base font-publicSans font-semibold">
                You might also like
            </h3>
            <div className="mt-2">
                {data &&
                    data.courses.map((courseDetails: ICourse) => {
                        if (courseDetails._id === currentCourseId) return null; // resusing explore page api, will contrain duplicate of same course
                        return (
                            <Link
                                to={`/explore/course/${courseDetails._id}`}
                                key={courseDetails._id}
                                onClick={() =>
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "instant",
                                    })
                                }
                            >
                                <CourseCardLong courseDetails={courseDetails} />
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
};

export default MoreCourses;
