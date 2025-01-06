import CourseCardSmall from "./CourseCardSmall";
import { useGetUserBoughtCourseListQuery } from "./myLearningApiSlice";

const BoughtCourseGrid = () => {
    const { data } = useGetUserBoughtCourseListQuery({});
    return (
        <div className="grid grid-cols-4 border border-red-400 gap-5">
            {data &&
                data.boughtCourseList.map(
                    (course: {
                        _id: string;
                        thumbnail: { url: string };
                        title: string;
                        createdBy: { legalName: string };
                    }) => (
                        <CourseCardSmall
                            key={course._id}
                            courseDetails={course}
                        />
                    )
                )}
        </div>
    );
};

export default BoughtCourseGrid;
