import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Ellipsis, ShieldAlert } from "lucide-react";
import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUpdateCourseStateAdminMutation } from "./CourseManagementApiSlice";
import { Link } from "react-router-dom";

export interface ICoupon {
    _id: string;
    code: string;
    description: string;
    isActive: boolean;
    discount: number;
    expiryDate: Date;
    usageLimit: number;
    usedBy: string[] | number[];
    maxDiscountAmount: number;
    minPurchaseAmount: number;
}

type Props = {
    data?: {
        _id: string;
        courseName: string;
        status: "draft" | "published" | "blocked";
        teacherName: string;
        unitsSold: number;
        totalRevenue: number;
        issuesCount: number;
    }[];
};

const CoureManagementTableBody: React.FC<Props> = ({ data }) => {
    const [updateCourseState] = useUpdateCourseStateAdminMutation();

    const handleCourseStateUpdate = async (
        courseId: string,
        newState: string
    ) => {
        try {
            await updateCourseState({ courseId, newState });
        } catch (error) {
            console.error("error while cousre takedown", error);
        }
    };

    return (
        <TableBody>
            {/* no course */}
            {data && data.length < 0 && (
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell colSpan={5} className="">
                        <p className="flex justify-center items-center gap-3 p-5">
                            <ShieldAlert />
                            No reports found
                        </p>
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
            )}

            {data &&
                data.map((report) => (
                    <TableRow
                        key={report._id}
                        className={`w-full hover:bg-slate-300 ${
                            report.status === "blocked" &&
                            "bg-red-300 hover:bg-red-400"
                        }`}
                    >
                        <TableCell className="underline">
                            <Link
                                to={`/explore/course/${report._id}`}
                                target="_blank"
                            >
                                {report.courseName}
                            </Link>
                        </TableCell>
                        <TableCell>{report.teacherName}</TableCell>
                        <TableCell>{report.status}</TableCell>
                        <TableCell>{report.unitsSold}</TableCell>

                        <TableCell>
                            {report.totalRevenue.toLocaleString("en-IN", {
                                style: "currency",
                                currency: "INR",
                            })}
                        </TableCell>
                        <TableCell>{report.issuesCount}</TableCell>

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
                                        {report.status === "published" ? (
                                            <button
                                                onClick={() =>
                                                    handleCourseStateUpdate(
                                                        report._id,
                                                        "blocked"
                                                    )
                                                }
                                                className=" py-1 px-2"
                                            >
                                                Take down
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handleCourseStateUpdate(
                                                        report._id,
                                                        "published"
                                                    )
                                                }
                                                className=" py-1 px-2"
                                            >
                                                Unblock
                                            </button>
                                        )}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="bg-white hover:bg-slate-400 border-0 py-0">
                                        <Link
                                            to={`/explore/course/${report._id}`}
                                            target="_blank"
                                            className=" py-1 px-2"
                                        >
                                            View Course
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
        </TableBody>
    );
};

export default CoureManagementTableBody;
