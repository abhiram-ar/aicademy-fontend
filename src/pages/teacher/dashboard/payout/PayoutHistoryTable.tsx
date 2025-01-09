import { useState } from "react";
import { useTeacherPayoutHistoryListQuery } from "./PayoutPageApiSlice";
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

const PayoutTransactionsTable = () => {
    const [page, setPage] = useState<number>(1);
    const { data } = useTeacherPayoutHistoryListQuery({});

    return (
        <div className="border  rounded-base overflow-hidden">
            <Table className="border-0 rounded-base overflow-hidden ">
                <TableHeader>
                    <TableRow className="bg-slate-400 ">
                        <TableHead className="w-80 font-semibold">
                            Time
                        </TableHead>
                        <TableHead className="w-60 font-semibold">
                            Status
                        </TableHead>
                        <TableHead className="w-60 font-semibold">
                            Remark
                        </TableHead>
                        <TableHead className="w-32 font-semibold">
                            Amount
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {/* no course */}
                    {data && data.payoutHistroy.length === 0 && (
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell colSpan={2}>
                                <p className="flex justify-center items-center gap-3 p-5 -ms-60 ">
                                    <ShieldAlert />
                                    No payout Histroy
                                </p>
                            </TableCell>

                            <TableCell></TableCell>
                        </TableRow>
                    )}

                    {data &&
                        data.payoutHistroy.map(
                            (payout: {
                                _id: string;
                                createdAt: string;
                                status: string;
                                message?: string;
                                amount: number;
                            }) => (
                                <TableRow
                                    key={payout._id}
                                    className="hover:bg-zinc-300 bg-white"
                                >
                                    <TableCell>
                                        {new Date(
                                            payout.createdAt
                                        ).toUTCString()}
                                    </TableCell>
                                    <TableCell>{payout.status}</TableCell>
                                    <TableCell>{payout.message}</TableCell>
                                    <TableCell className="text-green-600">
                                        {payout.amount.toLocaleString("en-IN", {
                                            style: "currency",
                                            currency: "INR",
                                        })}
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                </TableBody>
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
        </div>
    );
};

export default PayoutTransactionsTable;
