import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
    totalAmounts: { totalPrice: number; estimatedTotal: number };
    totalCourses: number;
};

const Checkout: React.FC<Props> = ({ totalAmounts, totalCourses }) => {
    return (
        <div className="col-span-4 bg-white border-2 border-black shadow-light rounded-base p-10 h-fit font-publicSans w-fit">
            <div className="flex justify-between items-center gap-2 -mt-1">
                <input
                    type="text"
                    placeholder="enter coupon"
                    className="input-neo"
                />
                <button className="bg-purple-300 h-fit px-5 py-2 rounded-base border-2 border-black mt-1 hover:bg-purple-400">
                    Apply
                </button>
            </div>
            <div className="flex justify-between mt-5">
                <p>
                    Price ({totalCourses}{" "}
                    {totalCourses > 1 ? "courses" : "course"})
                </p>{" "}
                <p>₹{totalAmounts?.estimatedTotal}</p>
            </div>

            <div className="flex justify-between mt-1">
                <p>Discount</p>
                <p className="text-green-600">
                    -₹{totalAmounts?.estimatedTotal - totalAmounts?.totalPrice}
                </p>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between font-semibold text-xl">
                <p>Total Amount</p>
                <p>₹{totalAmounts.totalPrice}</p>
            </div>

            <Button size="lg" className="w-full mt-3 font-medium text-lg py-6">Checkout</Button>
        </div>
    );
};

export default Checkout;
