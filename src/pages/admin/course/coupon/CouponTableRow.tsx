import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CircleCheck, CircleX, Ellipsis, ShieldAlert } from "lucide-react";
import React, { useEffect } from "react";
import { useGetCouponListQuery } from "./CouponManagementApiSlice";

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
    filter: {
        search: string;
        sortBy: string;
        page: number;
        limit: number;
        totalPages: number;
    };
    setFilter: React.Dispatch<
        React.SetStateAction<{
            search: string;
            sortBy: string;
            page: number;
            limit: number;
            totalPages: number;
        }>
    >;
};

const CouponTableBody: React.FC<Props> = ({ filter, setFilter }) => {
    const { data } = useGetCouponListQuery(filter);
    const currentData = data;

    useEffect(() => {
        if (data) {
            setFilter((value) => ({ ...value, totalPages: data.pages }));
        }
    });

    return (
        <TableBody>
            {/* no course */}
            {currentData && currentData.length <= 0 && (
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell colSpan={2} className="text-center">
                        <p className="flex justify-center items-center gap-3 p-5 -ms-10">
                            <ShieldAlert />
                            No user found
                        </p>
                    </TableCell>
                    <TableCell colSpan={2}></TableCell>
                </TableRow>
            )}

            {currentData &&
                currentData.couponList &&
                currentData.couponList.map((couponDetails: ICoupon) => (
                    <TableRow
                        key={couponDetails._id} //change to Live data id
                        className={`${
                            couponDetails.isActive
                                ? "hover:bg-slate-300 "
                                : "bg-zinc-300 hover:bg-zinc-400 text-black/80 hover:text-black "
                        } `}
                    >
                        <TableCell>{couponDetails.code}</TableCell>
                        <TableCell>{couponDetails.description}</TableCell>
                        <TableCell>
                            {couponDetails.isActive ? (
                                <CircleCheck className="fill-green-300" />
                            ) : (
                                <CircleX className="fill-red-300" />
                            )}
                        </TableCell>
                        <TableCell>{couponDetails.usedBy.length}</TableCell>

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
                                    <DropdownMenuItem className="bg-white hover:bg-slate-400 border-0 px-3 ">
                                        View full Details
                                    </DropdownMenuItem>

                                    <DropdownMenuItem className="bg-white hover:bg-slate-400 border-0 px-3 ">
                                        Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="bg-white hover:bg-slate-400 border-0 px-3 ">
                                        Deactivate
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
        </TableBody>
    );
};

export default CouponTableBody;
