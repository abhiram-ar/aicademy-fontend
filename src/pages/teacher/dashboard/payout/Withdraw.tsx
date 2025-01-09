import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { DialogClose } from "@radix-ui/react-dialog";
import { useRequestForPayoutMutation } from "./PayoutPageApiSlice";

const Withdraw: React.FC<{ withdrawable: number }> = ({ withdrawable }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<{ withdrawAmount: number }>();
    const closeDialogRef = useRef<HTMLButtonElement>(null);
    const withdrawButtonRef = useRef<HTMLButtonElement>(null);
    const [requestPayout] = useRequestForPayoutMutation();

    const handleWithdrawRequest = async (data: { withdrawAmount: number }) => {
        if (withdrawButtonRef.current)
            withdrawButtonRef.current.disabled = true;
        try {
            await requestPayout(data).unwrap();
            reset();
            closeDialogRef.current?.click();
        } catch (error) {
            console.error("errro while requesting for payout", error);
        } finally {
            if (withdrawButtonRef.current)
                withdrawButtonRef.current.disabled = false;
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="reverse" size="lg" className="bg-green-400">
                    Withdraw
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Withdraw earning</DialogTitle>
                    <DialogDescription>
                        min. Withdraw amount should be ₹1000
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <form
                        onSubmit={handleSubmit((data) =>
                            handleWithdrawRequest(data)
                        )}
                    >
                        <label
                            className="font-medium font-publicSans"
                            htmlFor="withdraw"
                        >
                            Amount{" "}
                            {errors.withdrawAmount && (
                                <span className="text-red-500">
                                    ({errors.withdrawAmount.message})
                                </span>
                            )}
                        </label>{" "}
                        <br />
                        <input
                            type="number"
                            {...register("withdrawAmount", {
                                valueAsNumber: true,
                                required: { value: true, message: "required" },
                                min: {
                                    value: 1000,
                                    message: "cannot be less than ₹1000",
                                },
                                max: {
                                    value: withdrawable,
                                    message: `you have only ₹${Math.floor(
                                        withdrawable
                                    )} to withdraw`,
                                },
                            })}
                            className="input-neo w-full"
                            placeholder="amount to withdraw"
                        />
                        <button
                            ref={withdrawButtonRef}
                            disabled={errors && Object.keys(errors).length > 0}
                            type="submit"
                            className="bg-green-400 px-3 py-1.5 border-2 border-black rounded-base block mt-3 ms-auto hover:bg-green-500 disabled:bg-zinc-400"
                        >
                            Withdraw
                        </button>
                    </form>
                </div>
                <DialogClose ref={closeDialogRef} />
            </DialogContent>
        </Dialog>
    );
};

export default Withdraw;
