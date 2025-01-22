import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CircleCheck, CircleX, Ellipsis, ShieldAlert } from "lucide-react";
import React, { useEffect } from "react";
import { ICoupon } from "./Types";
import {
    useGetCouponListQuery,
    useUpdateCouponStateAdminMutation,
} from "./CouponManagementApiSlice";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
    filter: {
        search: string;
        sortBy: string;
        page: number;
        limit: number;
        totalPages: number;
        data: boolean;
    };
    setFilter: React.Dispatch<
        React.SetStateAction<{
            search: string;
            sortBy: string;
            page: number;
            limit: number;
            totalPages: number;
            data: boolean;
        }>
    >;
};

const CouponTableBody: React.FC<Props> = ({ filter, setFilter }) => {
    const { data } = useGetCouponListQuery(filter);
    const [updateCouponState] = useUpdateCouponStateAdminMutation();
    const currentData = data;

    console.log(currentData);

    useEffect(() => {
        if (data) {
            setFilter((value) => ({
                ...value,
                totalPages: data.pages,
                data: data.length > 0 ? true : false,
            }));
        }
    }, [data, setFilter]);

    const handleCouponStateUpdate = async (
        couponId: string,
        newState: boolean
    ) => {
        try {
            await updateCouponState({
                couponId: couponId,
                isActive: newState,
            }).unwrap();
        } catch (error) {
            console.error("error while updating course state", error);
        }
    };

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
                                : "bg-red-200 hover:bg-red-300 text-black/80 hover:text-black "
                        } ${
                            new Date(couponDetails.expiryDate) <= new Date() &&
                            "bg-zinc-400 hover:bg-zinc-400"
                        }`}
                    >
                        <TableCell>{couponDetails.code}</TableCell>
                        <TableCell>{couponDetails.description}</TableCell>
                        <TableCell>
                            {!(
                                new Date(couponDetails.expiryDate) <= new Date()
                            ) ? (
                                <>
                                    {couponDetails.isActive ? (
                                        <CircleCheck className="fill-green-300" />
                                    ) : (
                                        <CircleX className="fill-red-300" />
                                    )}
                                </>
                            ) : (
                                <p>Expired</p>
                            )}
                        </TableCell>
                        <TableCell>{couponDetails.usedBy?.length}</TableCell>

                        <TableCell>
                            {!(
                                new Date(couponDetails.expiryDate) <= new Date()
                            ) && (
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
                                            {couponDetails.isActive ? (
                                                <button
                                                    className="w-full h-full text-left py-1"
                                                    onClick={() =>
                                                        handleCouponStateUpdate(
                                                            couponDetails._id,
                                                            false
                                                        )
                                                    }
                                                >
                                                    Deactivate
                                                </button>
                                            ) : (
                                                <button
                                                    className=" w-full h-full text-left py-1"
                                                    onClick={() =>
                                                        handleCouponStateUpdate(
                                                            couponDetails._id,
                                                            true
                                                        )
                                                    }
                                                >
                                                    Activate
                                                </button>
                                            )}
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
        </TableBody>
    );
};

export default CouponTableBody;
