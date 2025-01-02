import MainNavbar from "@/layout/MainNavbar";
import FIlterCategoryNav from "./FIlterCategoryNav";
import FilterSidebar from "./FilterSidebar";
import SortDropDown from "./SortDropDown";
import CourseCardLong from "./CourseCardLong";
import { useGetCoursesCardDetailsQuery } from "./exploreApiSlice.ts";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PaginationExplore from "./Pagination.tsx";

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
    pages: number;
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
        page: 1,
        limit: 5,
    });

    const { data: courseCardDetails } = useGetCoursesCardDetailsQuery(filter);
    console.log(courseCardDetails);

    return (
        <div>
            <MainNavbar query={filter.search} setFilter={setFilter} />
            <FIlterCategoryNav filter={filter} setFilter={setFilter} />

            {/* paper bg */}
            <div className="bg-[#fffbee] w-full min-h-screen pt-10">
                <div className="w-9/12  mx-auto grid grid-cols-12">
                    {/* left section  */}
                    <div className="col-span-3">
                        <h2 className="font-publicSans text-2xl font-semibold">
                            Showing all Courses
                        </h2>

                        <FilterSidebar filter={filter} setFilter={setFilter} />
                    </div>
                    {/* rigt seciotn - main */}
                    <div className=" relative col-span-9">
                        <div className="absolute right-0">
                            <SortDropDown setFilter={setFilter} />
                        </div>
                        <div className="mt-12">
                            {courseCardDetails &&
                                courseCardDetails.courses.map(
                                    (courseDetails: ICourse) => (
                                        <Link
                                            key={courseCardDetails._id}
                                            to={`/explore/course/${courseDetails._id}`}
                                        >
                                            <CourseCardLong
                                                courseDetails={courseDetails}
                                            />
                                        </Link>
                                    )
                                )}
                        </div>
                        {/* pagination */}
                        <div>
                            {courseCardDetails && (
                                <PaginationExplore
                                    filter={filter}
                                    setFilter={setFilter}
                                    pages={courseCardDetails.pages}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExplorePage;
