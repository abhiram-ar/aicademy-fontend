import MainNavbar from "@/layout/MainNavbar";
import FIlterCategoryNav from "./FIlterCategoryNav";
import FilterSidebar from "./FilterSidebar";
import SortDropDown from "./SortDropDown";
import CourseCardLong from "./CourseCardLong";

const ExplorePage = () => {
    return (
        <div>
            <MainNavbar />
            <FIlterCategoryNav />

            {/* paper bg */}
            <div className="bg-[#fffbee] w-full min-h-screen pt-10">
                <div className="w-9/12 border border-red-200 mx-auto grid grid-cols-12">
                    {/* left section  */}
                    <div className="col-span-3">
                        <h2 className="font-publicSans text-2xl font-semibold">
                            Showing all Courses
                        </h2>

                        <FilterSidebar />
                    </div>
                    {/* rigt seciotn - main */}
                    <div className="border border-green-400 relative col-span-9">
                        <div className="absolute right-0">
                            <SortDropDown />
                        </div>
                        <div className="mt-12">
                            <CourseCardLong />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
