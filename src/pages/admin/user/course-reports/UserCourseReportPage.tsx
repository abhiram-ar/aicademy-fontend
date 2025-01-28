import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import Search from "./Search";
import ReportsTableBody from "./ReportsTableRow";
import Pagination from "./Pagination";

const UserCourseReportPage = () => {
    const [filter, setFilter] = useState({
        search: "",
        page: 1,
        limit: 9,
    });
    const [metadata, setMetadata] = useState({ totalPages: 0, data: false });
    return (
        <div className="">
            <h2 className="font-medium text-2xl bg-zinc-300 px-2 rounded-base w-fit -mt-12 ms-12">
                User Reports
            </h2>
            <div className="w-10/12 mx-auto mt-5">
                <Search search={filter.search} setFilter={setFilter} />
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-zinc-700">
                                <TableHead className="w-80 text-darkText">
                                    Course Name
                                </TableHead>
                                <TableHead className="w text-darkText">
                                    Issue
                                </TableHead>
                                <TableHead className="w-44 text-darkText">
                                    User name
                                </TableHead>
                                <TableHead className="w-44 text-darkText">
                                    User email
                                </TableHead>
                                <TableHead className="w-20 text-center text-darkText">
                                    Options
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <ReportsTableBody
                            filter={filter}
                            setFilter={setFilter}
                            setMetadata={setMetadata}
                        />
                    </Table>
                    <Pagination
                        totalPages={metadata.totalPages}
                        page={filter.page}
                        setFilter={setFilter}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserCourseReportPage;
