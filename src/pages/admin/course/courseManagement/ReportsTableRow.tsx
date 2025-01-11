import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Ellipsis, ShieldAlert } from "lucide-react";
import React, { useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    // filter: {
    //     search: string;
    //     page: number;
    //     limit: number;
    // };
    // setFilter: React.Dispatch<
    //     React.SetStateAction<{
    //         search: string;
    //         page: number;
    //         limit: number;
    //     }>
    // >;
    // setMetadata: React.Dispatch<
    //     React.SetStateAction<{
    //         data: boolean;
    //         totalPages: number;
    //     }>
    // >;
    data?: {
        _id: string;
        courseName: string;
        status: "draft" | "pubblished";
        teacherName: string;
        unitsSold: number;
        totalRevenue: number;
        issuesCount: number;
    }[];
};

const CoureManagementTableBody: React.FC<Props> = ({ data }) => {
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
                        className="w-full hover:bg-slate-300"
                    >
                        <TableCell>{report.courseName}</TableCell>
                        <TableCell>{report.teacherName}</TableCell>
                        <TableCell>{report.status}</TableCell>
                        <TableCell>{report.unitsSold}</TableCell>

                        <TableCell>{report.totalRevenue}</TableCell>
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
