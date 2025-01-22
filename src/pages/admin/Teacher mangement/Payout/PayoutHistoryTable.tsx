import {
    useGetTeacherPayoutListAdminQuery,
    useUpdatePayoutApprovalStateMutation,
} from "./AdminPayoutPageApiSlice";
import { useState } from "react";
import { Ellipsis, ShieldAlert } from "lucide-react";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const PayoutTransactionsTable = () => {
    const [page, setPage] = useState<number>(1);
    const { data } = useGetTeacherPayoutListAdminQuery({ limit: 10, page });
    const [updatePayoutApprovalStatus] = useUpdatePayoutApprovalStateMutation();

    const handleUpdateApprovalState = async (
        payoutId: string,
        newStatus: boolean
    ) => {
        try {
            await updatePayoutApprovalStatus({ newStatus, payoutId }).unwrap();
        } catch (error) {
            console.error("error while updating payout approval state", error);
        }
    };

    return (
        <>
            <div className="">
                <Table className="">
                    <TableHeader>
                        <TableRow className="bg-zinc-700 text-white">
                            <TableHead className="w-60 text-darkText">
                                Name
                            </TableHead>
                            <TableHead className="w-60 text-darkText">
                                TeacherID
                            </TableHead>
                            <TableHead className="w-60 text-darkText">
                                Requested Time
                            </TableHead>
                            <TableHead className="w-32 text-darkText">
                                Status
                            </TableHead>
                            <TableHead className="w-32 text-darkText">
                                Amount
                            </TableHead>
                            <TableHead className="w-10 text-darkText">
                                Options
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* no course */}
                        {data && data.payout?.length === 0 && (
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
                            data.payoutList.map(
                                (payout: {
                                    _id: string;
                                    to: {
                                        _id: string;
                                        legalName: string;
                                    };

                                    createdAt: string;
                                    isApproved: boolean;
                                    status: string;
                                    message?: string;
                                    amount: number;
                                }) => (
                                    <TableRow
                                        key={payout._id}
                                        className={`hover:bg-slate-300 ${
                                            payout.isApproved && "bg-zinc-300"
                                        }`}
                                    >
                                        <TableCell>
                                            {payout.to.legalName}
                                        </TableCell>
                                        <TableCell>{payout.to._id}</TableCell>
                                        <TableCell>
                                            {new Date(
                                                payout.createdAt
                                            ).toUTCString()}
                                        </TableCell>
                                        <TableCell
                                            className={`font-semibold ${
                                                payout.status ===
                                                    "processing" &&
                                                " text-yellow-600  "
                                            } ${
                                                payout.status === "deposited" &&
                                                "text-green-600"
                                            } ${
                                                payout.status === "failed" ||
                                                (payout.status ===
                                                    "cancelled" &&
                                                    "text-red-600")
                                            }`}
                                        >
                                            {payout.status}
                                        </TableCell>

                                        <TableCell>
                                            {payout.amount.toLocaleString(
                                                "en-IN",
                                                {
                                                    style: "currency",
                                                    currency: "INR",
                                                }
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            {!payout.isApproved && (
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
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
                                                        <DropdownMenuItem className="bg-white hover:bg-green-400 border-0 py-0">
                                                            <button
                                                                onClick={() =>
                                                                    handleUpdateApprovalState(
                                                                        payout._id,
                                                                        true
                                                                    )
                                                                }
                                                                className=" w-full text-left py-1"
                                                            >
                                                                Approve
                                                            </button>
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem className="bg-white hover:bg-red-400 border-0 py-0">
                                                            <button
                                                                onClick={() =>
                                                                    handleUpdateApprovalState(
                                                                        payout._id,
                                                                        false
                                                                    )
                                                                }
                                                                className=" w-full text-left py-1"
                                                            >
                                                                Reject
                                                            </button>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                    </TableBody>
                </Table>
            </div>
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

export default PayoutTransactionsTable;
