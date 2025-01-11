import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ShieldAlert } from "lucide-react";
import React from "react";

type Props = {
    data: {
        createdBy: string;
        _id: string;
        orderValue: number;
        platformFee: number;
        createdAt: Date;
    }[];
};

const RevenueTableBody: React.FC<Props> = ({ data }) => {
    return (
        <>
            <TableBody>
                {/* no course */}
                {data && data.length <= 0 && (
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

                {data &&
                    data.map((report) => (
                        <TableRow
                            key={report._id} //change to Live data id
                            className="hover:bg-slate-300"
                        >
                            <TableCell>
                                {new Date(report.createdAt).toUTCString()}
                            </TableCell>
                            <TableCell>{report._id}</TableCell>
                            <TableCell>{report.orderValue}</TableCell>
                            <TableCell
                                className={
                                    report.platformFee >= 0
                                        ? "text-green-600"
                                        : " text-red-600 "
                                }
                            >
                                +{report.platformFee.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </>
    );
};

export default RevenueTableBody;
