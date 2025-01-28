import { Button } from "@/components/ui/button";
import { loadScript } from "@/utils/loadscript";
import React, { useEffect } from "react";
import {
    useCreateBankVerificationOrderMutation,
    useVerifyTeacherBankAccountMutation,
} from "./PayoutPageApiSlice";

const BankVerification = () => {
    useEffect(() => {
        loadScript("https://checkout.razorpay.com/v1/checkout.js");
    }, []);
    const [createBankVerificationOrder] =
        useCreateBankVerificationOrderMutation();
    const [verifyBankAccount] = useVerifyTeacherBankAccountMutation();

    const handleBankVerification = async () => {
        try {
            const createOrderResponse = await createBankVerificationOrder(
                {}
            ).unwrap();
            console.log(createOrderResponse);

            const options = {
                key: "rzp_test_nzVid1xtKEuRtN",
                amount: createOrderResponse.order.amount,
                currency: "INR",
                name: "AICademy",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: createOrderResponse.order.id,
                theme: {
                    color: "#ffdc58",
                },
                config: {
                    display: {
                        blocks: {
                            utib: {
                                //name for Axis block
                                name: "Pay using UPI Account verification",
                                instruments: [
                                    {
                                        method: "upi",
                                    },
                                ],
                            },
                        },
                        sequence: ["block.utib"],
                        preferences: {
                            show_default_blocks: false, // Should Checkout show its default blocks?
                        },
                    },
                },
                handler: async function (response: {
                    razorpay_payment_id: string;
                    razorpay_order_id: string;
                    razorpay_signature: string;
                }) {
                    await verifyBankAccount({
                        ...response,
                        order_id: createOrderResponse.order.id,
                    });
                    console.log(response);
                },
            };
            /* eslint-disable @typescript-eslint/ban-ts-comment */
            // @ts-ignore
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
