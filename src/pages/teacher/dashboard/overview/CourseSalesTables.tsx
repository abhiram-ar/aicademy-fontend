import { useGetCourseSalesListQuery } from "./OverviewPageApiSlice";
import { ShieldAlert } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const CourseSalesTables = () => {
    const { data } = useGetCourseSalesListQuery({});
    console.log(data);
    return (
        <div className="border  rounded-base overflow-hidden">
            <Table className="border-0 rounded-base overflow-hidden ">
                <TableHeader>
                    <TableRow className="bg-slate-400 ">
                        <TableHead className="w-80 font-semibold">
                            Course Name
                        </TableHead>
                        <TableHead className="w-60 font-semibold">
                            Bought At
                        </TableHead>
                        <TableHead className="w-24 font-semibold">
                            Sold Price
                        </TableHead>

                        <TableHead className="w-20 font-semibold">
                            Revenue
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* no course */}
                    {data && data.salesList.length === 0 && (
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>
                                <p className="flex justify-center items-center gap-3 p-5 -ms-96 ">
                                    <ShieldAlert />
                                    No purchases
                                </p>
                            </TableCell>

                            <TableCell></TableCell>
                        </TableRow>
                    )}

                    {data &&
                        data.salesList.map((sale, index: number) => (
                            <TableRow
                                key={index}
                                className="hover:bg-zinc-300 bg-white"
                            >
                                <TableCell>{sale.course[0]?.title}</TableCell>
                                <TableCell>
                                    {new Date(sale.createdAt).toUTCString()}
                                </TableCell>
                                <TableCell>
                                    {sale.soldPrice.toLocaleString("en-IN", {
                                        style: "currency",
                                        currency: "INR",
                                    })}
                                </TableCell>
                                <TableCell className="text-green-600">
                                    {"+" +
                                        (sale.techerEarnings?.toLocaleString(
                                            "en-IN",
                                            {
                                                style: "currency",
                                                currency: "INR",
                                            }
                                        ) || 0)}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CourseSalesTables;
