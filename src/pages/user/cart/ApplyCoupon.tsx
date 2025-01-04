import React, { useState } from "react";
import { useApplyCouponMutation } from "./cartApiSlice";

const ApplyCoupon = () => {
    const [value, setValue] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [applyCoupon] = useApplyCouponMutation();

    const handleApplyCoupon = async () => {
        if(value===""){
            return setErrorMsg("Enter Coupon code")
        }
        
        try {
            const response = await applyCoupon({ code: value }).unwrap();
            console.log(response);
        } catch (error) {
            console.error("error while applying coupon", error);
            const err = error as { data: { errorMessage: string } };
            if (err && err.data) {
                setErrorMsg(err.data.errorMessage);
            }
        }
    };

    return (
        <div className="relative pb-1">
            <div className="flex justify-between items-center gap-2 ">
                {" "}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                        if (errorMsg) setErrorMsg("");
                        setValue(e.target.value);
                    }}
                    placeholder="enter coupon"
                    className="input-neo"
                />
                <button
                    onClick={handleApplyCoupon}
                    className="bg-purple-300 h-fit px-5 py-2 rounded-base border-2 border-black mt-1 hover:bg-purple-400"
                >
                    Apply
                </button>
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
