import MainNavbar from "@/layout/MainNavbar";
import BoughtCourseGrid from "./BoughtCourseGrid";

const MyLearning = () => {
    return (
        <div>
            <MainNavbar query="" />
            <div className="w-full min-h-screen bg-paperYellow">
                <div className="w-9/12 mx-auto border py-10">
                    <h2 className="bg-zinc-400 text-xl font-semibold w-fit px-1 rounded-base">
                        My Courses
                    </h2>

                    <div className="mt-5">
                        <BoughtCourseGrid />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyLearning;
