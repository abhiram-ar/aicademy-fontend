import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Ellipsis, ShieldAlert } from "lucide-react";
import React from "react";

const RevenueTableBody: React.FC<Props> = ({}) => {
    const data = false;
    const currentData = data;

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
                            createdBy: string;
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
                                <TableCell>{report.createdBy}</TableCell>
                            </TableRow>
                        )
                    )}
            </TableBody>
        </>
    );
};

export default RevenueTableBody;
