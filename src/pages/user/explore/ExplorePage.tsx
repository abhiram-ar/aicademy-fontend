import MainNavbar from "@/layout/MainNavbar";
import FIlterCategoryNav from "./FIlterCategoryNav";
import FilterSidebar from "./FilterSidebar";
import SortDropDown from "./SortDropDown";
import CourseCardLong from "./CourseCardLong";
import { useGetCoursesCardDetailsQuery } from "./exploreApiSlice.ts";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export interface ICourse {
    _id: string;
    title: string;
    description: string;
    createdBy: {
        firstName: string;
        lastName: string;
        legalName: string;
    };
    price: number;
    estimatedPrice: number;
    thumbnail: { public_id: string; url: string };
    rating?: number;
    boughtCount: number;
    category: string;
    level: "beginner" | "intermediate" | "advanced";
}

const ExplorePage = () => {
    //if redirected from somewhere else
    const { state } = useLocation();

    const [filter, setFilter] = useState({
        search: state?.searchQuery || "",
        category: "",
        level: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "price",
        sortOrder: -1,
        page: "",
        limit: 10,
    });

    const { data: courseCardDetails } = useGetCoursesCardDetailsQuery(filter);
    console.log(courseCardDetails);

    return (
        <div>
            <MainNavbar query={filter.search} setFilter={setFilter} />
            <FIlterCategoryNav filter={filter} setFilter={setFilter} />

            {/* paper bg */}
            <div className="bg-[#fffbee] w-full min-h-screen pt-10">
                <div className="w-9/12 border border-red-200 mx-auto grid grid-cols-12">
                    {/* left section  */}
                    <div className="col-span-3">
                        <h2 className="font-publicSans text-2xl font-semibold">
                            Showing all Courses
                        </h2>

                        <FilterSidebar filter={filter} setFilter={setFilter} />
                    </div>
                    {/* rigt seciotn - main */}
                    <div className="border border-green-400 relative col-span-9">
                        <div className="absolute right-0">
                            <SortDropDown setFilter={setFilter} />
                        </div>
                        <div className="mt-12">
                            {courseCardDetails &&
                                courseCardDetails.courses.map(
                                    (courseDetails: ICourse) => (
                                        <Link
                                            to={`/explore/course/${courseDetails._id}`}
                                        >
                                            <CourseCardLong
                                                key={courseCardDetails._id}
                                                courseDetails={courseDetails}
                                            />
                                        </Link>
                                    )
                                )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
