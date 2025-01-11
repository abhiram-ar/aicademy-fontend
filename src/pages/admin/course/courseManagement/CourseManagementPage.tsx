import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CoureManagementTableBody from "./ReportsTableRow";
import { useGetAllCourseOverviewReportQuery } from "./CourseManagementApiSlice";
import SearchField from "./Search";
import { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const CourseManagementPage = () => {
    const [filter, setFilter] = useState({
        search: "",
        page: 1,
        limit: 5,
    });
    const { data: query } = useGetAllCourseOverviewReportQuery(filter);
    return (
        <div className="mx-10">
            <h2 className="font-medium text-2xl bg-zinc-300 px-2 rounded-base w-fit -mt-12 ms-2">
                Courses
            </h2>

            <div className="w-10/12 mx-auto mt-5">
                <SearchField search={filter.search} setFilter={setFilter} />
                <Table>
                    <TableHeader>
                        <TableRow className="bg-zinc-700">
                            <TableHead className="w-80 text-darkText">
                                Course Name
                            </TableHead>
                            <TableHead className="w-60 text-darkText">
                                CreatedBy
                            </TableHead>
                            <TableHead className="w-32 text-darkText">
                                Current status
                            </TableHead>
                            <TableHead className="w-32 text-darkText">
                                Units sold
                            </TableHead>
                            <TableHead className="w-32  text-darkText">
                                Total Revenue
                            </TableHead>
                            <TableHead className="w-20  text-darkText">
                                Issues
                            </TableHead>
                            <TableHead className="w-20 text-center text-darkText">
                                Options
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <CoureManagementTableBody data={query?.data} />
                </Table>

                {/* pagination */}
                {query && (
                    <Pagination className="mt-5">
                        <PaginationContent>
                            {filter.page > 1 && (
                                <PaginationItem className="cursor-pointer">
                                    <PaginationPrevious
                                        className="bg-zinc-200"
                                        onClick={() =>
                                            setFilter((value) => ({
                                                ...value,
                                                page: filter.page - 1,
                                            }))
                                        }
                                    />
                                </PaginationItem>
                            )}

                            {Array.from({
                                length: query.pages,
                            }).map((_, index) => (
                                <PaginationItem
                                    key={index + 1}
                                    className="cursor-pointer"
                                >
                                    <PaginationLink
                                        className={`bg-zinc-200  ${
                                            index + 1 === filter.page &&
                                            "bg-black text-white"
                                        }`}
                                        onClick={() =>
                                            setFilter((value) => ({
                                                ...value,
                                                page: index + 1,
                                            }))
                                        }
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                            {filter.page < query.pages && (
                                <PaginationItem className="cursor-pointer">
                                    <PaginationNext
                                        className="bg-zinc-200"
                                        onClick={() =>
                                            setFilter((value) => ({
                                                ...value,
                                                page: filter.page + 1,
                                            }))
                                        }
                                    />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </div>
    );
};

export default CourseManagementPage;
