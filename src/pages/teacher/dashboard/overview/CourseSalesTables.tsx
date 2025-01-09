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
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

const CourseSalesTables = () => {
    const [page, setPage] = useState<number>(1);
    const { data } = useGetCourseSalesListQuery({ page });

    console.log(data);
    return (
        <>
            <div className="border-2  rounded-base overflow-hidden">
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
                            data.salesList.map(
                                (
                                    sale: {
                                        course: {
                                            title: string;
                                        }[];
                                        createdAt: string | number | Date;
                                        soldPrice: number;
                                        techerEarnings: number;
                                    },
                                    index: number
                                ) => (
                                    <TableRow
                                        key={index}
                                        className="hover:bg-zinc-300 bg-white"
                                    >
                                        <TableCell>
                                            {sale.course[0]?.title}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                sale.createdAt
                                            ).toUTCString()}
                                        </TableCell>
                                        <TableCell>
                                            {sale.soldPrice.toLocaleString(
                                                "en-IN",
                                                {
                                                    style: "currency",
                                                    currency: "INR",
                                                }
                                            )}
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
                                )
                            )}
                    </TableBody>
                </Table>
            </div>
            {/* pagination */}
            {data && (
                <Pagination className="mt-3">
                    <PaginationContent>
                        {page > 1 && (
                            <PaginationItem className="cursor-pointer">
                                <PaginationPrevious
                                    className="bg-zinc-200"
                                    onClick={() => setPage(page - 1)}
                                />
                            </PaginationItem>
                        )}

                        {Array.from({
                            length: data.pages,
                        }).map((_, index) => (
                            <PaginationItem
                                key={index + 1}
                                className="cursor-pointer"
                            >
                                <PaginationLink
                                    className={`bg-zinc-200  ${
                                        index + 1 === page &&
                                        "bg-black text-white"
                                    }`}
                                    onClick={() => setPage(index + 1)}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {page < data.pages && (
                            <PaginationItem className="cursor-pointer">
                                <PaginationNext
                                    className="bg-zinc-200"
                                    onClick={() => setPage(page + 1)}
                                />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            )}
        </>
    );
};

export default CourseSalesTables;
