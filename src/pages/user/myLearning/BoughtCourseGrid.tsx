import { Link } from "react-router-dom";
import CourseCardSmall from "./CourseCardSmall";
import { useGetUserBoughtCourseListQuery } from "./myLearningApiSlice";

const BoughtCourseGrid = () => {
    const { data } = useGetUserBoughtCourseListQuery({});
    return (
        <div className="flex flex-wrap gap-5 lg:gap-2 xl:gap-4 justify-center md:justify-start  items-center">
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
