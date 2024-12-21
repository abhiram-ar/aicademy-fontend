import { useGetFullCourseDetailsQuery } from "@/redux/features/teacher/courseCreationAPIs";
import React from "react";
import { useParams } from "react-router-dom";

const CourseDraft: React.FC = () => {
    const { id } = useParams();
    const { data } = useGetFullCourseDetailsQuery({ courseId: id });


    console.log(id);
    console.log(data);

    return <div>CourseDraft</div>;
};

export default CourseDraft;
