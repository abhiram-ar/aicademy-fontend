import React from "react";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ReportsTableBody from "./RevenueTableBody";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import RevenueTableBody from "./RevenueTableBody";

const RevenueTable = () => {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow className="bg-zinc-700">
                        <TableHead className="w-80 text-darkText">
                            Time
                        </TableHead>
                        <TableHead className="w-80 text-darkText">
                            OrderID
                        </TableHead>
                        <TableHead className="w-32 text-darkText">
                            Revenue
                        </TableHead>
                        <TableHead className="w-32 text-darkText">
                            Profit
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <RevenueTableBody />
            </Table>

            {/* pagination */}
            {data && (
                <Pagination className="mt-5">
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

export default RevenueTable;
