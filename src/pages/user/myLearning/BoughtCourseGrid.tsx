import React from "react";
import CourseCardSmall from "./CourseCardSmall";

const BoughtCourseGrid = () => {
    return (
        <div className="grid grid-cols-4 border border-red-400 gap-5">
            <CourseCardSmall />
            <CourseCardSmall />
            <CourseCardSmall />
            <CourseCardSmall />
            <CourseCardSmall />
            <CourseCardSmall />
        </div>
    );
};

export default BoughtCourseGrid;
