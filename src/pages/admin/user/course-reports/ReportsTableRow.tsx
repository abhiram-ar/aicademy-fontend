import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Ellipsis, ShieldAlert } from "lucide-react";
import React, { useEffect } from "react";
import {
    useGetCourseReportListQuery,
    useUpdateCourseReportStateAdminMutation,
} from "./CourseReportsApiSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
    filter: {
        search: string;
        page: number;
        limit: number;
    };
    setFilter: React.Dispatch<
        React.SetStateAction<{
            search: string;
            page: number;
            limit: number;
        }>
    >;
    setMetadata: React.Dispatch<
        React.SetStateAction<{
            data: boolean;
            totalPages: number;
        }>
    >;
};

const ReportsTableBody: React.FC<Props> = ({ filter, setMetadata }) => {
    const { data } = useGetCourseReportListQuery(filter);
    const [updateReportState] = useUpdateCourseReportStateAdminMutation();
    const currentData = data;
    console.log("d", currentData);
    useEffect(() => {
        if (data)
            setMetadata({
                data: data.length > 0 ? true : false,
                totalPages: data.pages,
            });
    }, [data, setMetadata]);

    const handleReportStateUpdate = async (
        reportId: string,
        newStatus: "pending" | "resolved"
    ) => {
        try {
            await updateReportState({ reportId, newStatus }).unwrap();
        } catch (error) {
            console.error("error while updating report state", error);
        }
    };

    return (
        <>
            <TableBody>
                {/* no course */}
                {currentData && currentData.length <= 0 && (
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell className="">
                            <p className="flex justify-center items-center gap-3 p-5 -ms-24">
                                <ShieldAlert />
                                No reports found
                            </p>
                        </TableCell>
                        <TableCell colSpan={2}></TableCell>
                    </TableRow>
                )}

                {currentData &&
                    currentData.reportList &&
                    currentData.reportList.map(
                        (report: {
                            createdBy: {
                                firstName: string;
                                lastName: string;
                                email: string;
                            };
                            courseId: { _id: string; title: string };
                            status: "pending" | "resolved";
                            title: string;
                            _id: string;
                        }) => (
                            <TableRow
                                key={report._id} //change to Live data id
                                className={`hover:bg-slate-300 ${
                                    report.status === "resolved" &&
                                    "bg-zinc-400 hover:bg-zinc-400"
                                }`}
                            >
                                <TableCell>{report.courseId.title}</TableCell>
                                <TableCell>{report.title}</TableCell>
                                <TableCell>{report.createdBy.firstName + " "  + report.createdBy.lastName}</TableCell>
                                <TableCell>{report.createdBy.email}</TableCell>

                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="border border-zinc-400 h-8 w-8 p-0 bg-slate-300 flex justify-center items-center rounded-base hover:bg-slate-400 focus:outline-none">
                                                <Ellipsis className="size-4" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="bg-white px-2"
                                        >
                                            <DropdownMenuLabel>
                                                Actions
                                            </DropdownMenuLabel>
                                            <DropdownMenuItem className="bg-white hover:bg-slate-400 border-0 py-0">
                                                {report.status === "pending" ? (
                                                    <button
                                                        onClick={() =>
                                                            handleReportStateUpdate(
                                                                report._id,
                                                                "resolved"
                                                            )
                                                        }
                                                        className=" py-1 px-2"
                                                    >
                                                        Mark as Resolved
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            handleReportStateUpdate(
                                                                report._id,
                                                                "pending"
                                                            )
                                                        }
                                                        className=" py-1 px-2"
                                                    >
                                                        Mark as pending
                                                    </button>
                                                )}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )
                    )}
            </TableBody>
        </>
    );
};

export default ReportsTableBody;
