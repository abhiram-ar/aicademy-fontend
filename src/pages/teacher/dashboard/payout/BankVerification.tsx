import { Button } from "@/components/ui/button";
import { loadScript } from "@/utils/loadscript";
import React, { useEffect } from "react";

const BankVerification = () => {
    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    }, []);

    const handleBankVerification = async () => {
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
                        order: createOrderResponse,
                    }).unwrap();
                    toast.success("Start learning");
                },
            };

            const rzp1 = new Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.log("error while bank verification", error);
        }
    };

    return (
        <Button onClick={handleBankVerification} variant="reverse" size="lg">
            Verify Bank
        </Button>
    );
};

export default BankVerification;
