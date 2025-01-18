import { Link } from "react-router-dom";
import CourseCardSmall from "./CourseCardSmall";
import { useGetUserBoughtCourseListQuery } from "./myLearningApiSlice";

const BoughtCourseGrid = () => {
    const { data } = useGetUserBoughtCourseListQuery({});
    return (
        <div className="grid grid-cols-4 gap-5">
            {data &&
                data.boughtCourseList.map(
                    (course: {
                        _id: string;
                        thumbnail: { url: string };
                        title: string;
                        createdBy: { legalName: string };
                    }) => (
                        <Link to={`/user/learn/${course._id}`} key={course._id}>
                            <CourseCardSmall courseDetails={course} />
                        </Link>
                    )
                )}
        </div>
    );
};

export default BoughtCourseGrid;
