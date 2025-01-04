import { Button } from "@/components/ui/button";
import { loadScript } from "@/utils/loadscript";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ApplyCoupon from "./ApplyCoupon";
import {
    useCreateOrderMutation,
    useVerifyPaymentandCheckoutMutation,
} from "./cartApiSlice";

type Props = {
    totalAmounts?: { totalPrice: number; estimatedTotal: number };
    totalCourses?: number;
    couponDetails?: { code: string; couponDiscount: number };
    refetchCart: () => unknown;
};

const Checkout: React.FC<Props> = ({
    totalAmounts,
    totalCourses,
    couponDetails,
    refetchCart,
}) => {
    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    }, []);

    const [createOrder] = useCreateOrderMutation();
    const [verifyAndCheckout] = useVerifyPaymentandCheckoutMutation();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        try {
            const createOrderResponse = await createOrder({}).unwrap();
            console.log(createOrderResponse);

            const options = {
                key: "rzp_test_nzVid1xtKEuRtN",
                amount: createOrderResponse.orderDetails.amount,
                currency: "INR",
                name: "AICademy",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: createOrderResponse.orderDetails.id,
                theme: {
                    color: "#ffdc58",
                },
                handler: async function (response: {
                    razorpay_payment_id: string;
                    razorpay_order_id: string;
                    razorpay_signature: string;
                }) {
                    console.log(response);
                    await verifyAndCheckout({
                        ...response,
                        order_id: createOrderResponse.orderDetails.id,
                    }).unwrap();
                    toast.success("Start learning");
                    setTimeout(() => navigate("/"), 2000);
                },
            };

            const rzp1 = new Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.log("error while checkout", error);

            const err = error as { data?: { errorMessage: string } };
            if (err.data) {
                toast.error(err.data.errorMessage);
                // refetch the cart details for valid cart details from backend
                refetchCart();
            }
        }
    };
    return (
        <div className="col-span-4 bg-white border-2 border-black shadow-light rounded-base p-8 h-fit font-publicSans w-fit relative">
            {!totalCourses && (
                <div className="absolute inset-0 bg-zinc-400/80 z-50"></div>
            )}
            <div className="-mt-1">
                <ApplyCoupon couponCode={couponDetails?.code} />
            </div>

            {/* total estiamted Price */}
            <div className="flex justify-between mt-5">
                <p>
                    Price ({totalCourses}{" "}
                    {totalCourses && totalCourses > 1 ? "courses" : "course"})
                </p>{" "}
                <p>₹{totalAmounts?.estimatedTotal}</p>
            </div>

            {/* discount from estiamted price */}
            <div className="flex justify-between mt-1">
                <p>Discount</p>
                <p className="text-green-600">
                    -₹
                    {totalAmounts &&
                        totalAmounts?.estimatedTotal - totalAmounts?.totalPrice}
                </p>
            </div>

            {/* discount from coupon */}
            {couponDetails?.couponDiscount && (
                <div className="flex justify-between mt-1">
                    <p>Coupon discount</p>
                    <p className="text-green-600">
                        -₹
                        {couponDetails.couponDiscount}
                    </p>
                </div>
            )}

            <hr className="my-3" />
            <div className="flex justify-between font-semibold text-xl">
                <p>Total Amount</p>
                <p>₹{totalAmounts?.totalPrice}</p>
            </div>

            <Button
                onClick={handleCheckout}
                size="lg"
                className="w-full mt-3 font-medium text-lg py-6 z-10"
            >
                Checkout
            </Button>
        </div>
    );
};

export default Checkout;
