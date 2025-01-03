import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CircleCheck, CircleX, Ellipsis, ShieldAlert } from "lucide-react";
import React from "react";

export interface ICoupon {
    code: string;
    description: string;
    isActive: boolean;
    discount: number;
    expiryDate: Date;
    usageLimit: number;
    usedBy:  string[] | number[];
    maxDiscountAmount: number;
    minPurchaseAmount: number;
}

const mockCoupons: ICoupon[] = [
    {
        code: "SAVE10",
        description: "Get 10% off on your next purchase",
        isActive: true,
        discount: 10,
        expiryDate: new Date("2024-12-31T23:59:59.999Z"),
        usageLimit: 100,
        usedBy: [123, 2312, 31, 312, 13, 1, 123, 1312, 12, 31, 12, 312, 3],
        maxDiscountAmount: 500,
        minPurchaseAmount: 1000,
    },
    {
        code: "WELCOME20",
        description: "Flat 20% off for new users",
        isActive: true,
        discount: 20,
        expiryDate: new Date("2025-01-15T23:59:59.999Z"),
        usageLimit: 200,
        usedBy: [],
        maxDiscountAmount: 1000,
        minPurchaseAmount: 500,
    },
    {
        code: "FESTIVE50",
        description: "50% off on festive season products",
        isActive: true,
        discount: 50,
        expiryDate: new Date("2024-12-25T23:59:59.999Z"),
        usageLimit: 50,
        usedBy: [12, 123, 12312, 3123, 12],
        maxDiscountAmount: 2000,
        minPurchaseAmount: 3000,
    },
    {
        code: "YEARLY25",
        description: "25% discount on yearly subscriptions",
        isActive: true,
        discount: 25,
        expiryDate: new Date("2025-06-30T23:59:59.999Z"),
        usageLimit: 150,
        usedBy: [],
        maxDiscountAmount: 1500,
        minPurchaseAmount: 5000,
    },
    {
        code: "STUDENT15",
        description: "15% discount for students",
        isActive: false,
        discount: 15,
        expiryDate: new Date("2025-03-31T23:59:59.999Z"),
        usageLimit: 500,
        usedBy: [],
        maxDiscountAmount: 700,
        minPurchaseAmount: 2000,
    },
    {
        code: "SUMMER30",
        description: "Summer sale - 30% off on all products",
        isActive: true,
        discount: 30,
        expiryDate: new Date("2025-08-31T23:59:59.999Z"),
        usageLimit: 300,
        usedBy: [],
        maxDiscountAmount: 1000,
        minPurchaseAmount: 1500,
    },
    {
        code: "FLASHDEAL5",
        description: "Flat 5% discount for flash deals",
        isActive: true,
        discount: 5,
        expiryDate: new Date("2024-12-24T23:59:59.999Z"),
        usageLimit: 1000,
        usedBy: [],
        maxDiscountAmount: 100,
        minPurchaseAmount: 500,
    },
    {
        code: "LOYALTY40",
        description: "40% off for loyal customers",
        isActive: false,
        discount: 40,
        expiryDate: new Date("2025-12-31T23:59:59.999Z"),
        usageLimit: 100,
        usedBy: [],
        maxDiscountAmount: 3000,
        minPurchaseAmount: 5000,
    },
    {
        code: "BULKBUY20",
        description: "20% discount on bulk purchases",
        isActive: true,
        discount: 20,
        expiryDate: new Date("2025-07-31T23:59:59.999Z"),
        usageLimit: 250,
        usedBy: [1, 2, 3, 434],
        maxDiscountAmount: 1500,
        minPurchaseAmount: 4000,
    },
    {
        code: "WEEKEND15",
        description: "Weekend special - 15% off",
        isActive: true,
        discount: 15,
        expiryDate: new Date("2025-02-28T23:59:59.999Z"),
        usageLimit: 500,
        usedBy: [],
        maxDiscountAmount: 750,
        minPurchaseAmount: 1000,
    },
];

const CouponTableBody = () => {
    const currentData = { couponList: mockCoupons };

    return (
        <TableBody>
            {/* no course */}
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

            {currentData &&
                currentData.couponList &&
                currentData.couponList.map((couponDetails: ICoupon, index) => (
                    <TableRow
                        key={index} //change to Live data id
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
