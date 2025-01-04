import React, { useEffect, useState } from "react";
import {
    useApplyCouponMutation,
    useRemoveCouponFromCartMutation,
} from "./cartApiSlice";

type Props = {
    couponCode?: string;
};

const ApplyCoupon: React.FC<Props> = ({ couponCode }) => {
    const [value, setValue] = useState(couponCode || "");
    const [errorMsg, setErrorMsg] = useState("");
    const [applyCoupon] = useApplyCouponMutation();
    const [removeCoupon] = useRemoveCouponFromCartMutation();

    useEffect(() => {
        setValue(couponCode || "");
    }, [couponCode, setValue]);

    const handleApplyCoupon = async () => {
        if (value === "") {
            return setErrorMsg("Enter Coupon code");
        }

        try {
            const response = await applyCoupon({ code: value }).unwrap();
            console.log(response);
            setErrorMsg("")
        } catch (error) {
            console.error("error while applying coupon", error);
            const err = error as { data: { errorMessage: string } };
            if (err && err.data) {
                setErrorMsg(err.data.errorMessage);
            }
        }
    };

    const handleRemoveCoupon = async () => {
        try {
            await removeCoupon({}).unwrap();
        } catch (error) {
            console.error("error while removing coupon from cart", error);
        }
    };

    return (
        <div className="relative pb-1">
            <div className="flex justify-between items-center gap-2 ">
                {" "}
                <input
                    type="text"
                    value={value}
                    disabled={couponCode ? true : false}
                    onChange={(e) => {
                        if (errorMsg) setErrorMsg("");
                        setValue(e.target.value);
                    }}
                    placeholder="enter coupon"
                    className="input-neo disabled:bg-zinc-200 disabled:text-purple-900/80 disabled:font-semibold"
                />
                {!couponCode ? (
                    <button
                        onClick={handleApplyCoupon}
                        className="bg-purple-300 h-fit px-5 py-2 rounded-base border-2 border-black mt-1 hover:bg-purple-400"
                    >
                        Apply
                    </button>
                ) : (
                    <button
                        onClick={handleRemoveCoupon}
                        className="bg-red-300 h-fit px-3 py-2 rounded-base border-2 border-black mt-1 hover:bg-red-400"
                    >
                        Remove
                    </button>
                )}
            </div>
            {errorMsg && (
                <p className="text-sm text-red-500 ms-2 mt-0.5 absolute">
                    {errorMsg}
                </p>
            )}
        </div>
    );
};

export default ApplyCoupon;
