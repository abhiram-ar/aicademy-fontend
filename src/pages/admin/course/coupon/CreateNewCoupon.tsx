import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateCouponAdminMutation } from "./CouponManagementApiSlice";
import toast from "react-hot-toast";
import { useRef } from "react";
import { DialogClose } from "@radix-ui/react-dialog";

type formFields = {
    code: string;
    description: string;
    discount: number;
    expiryDate: Date;
    usageLimit: number;
    maxDiscountAmount: number;
    minPurchaseAmount: number;
};

const CreateNewCoupon = () => {
    const [createCoupon] = useCreateCouponAdminMutation();
    const closeButtonRef = useRef<HTMLButtonElement | null>(null);

    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<formFields>();

    const handlleCreateCoupon = async (data: formFields) => {
        try {
            await createCoupon(data).unwrap();
            toast.success("coupon created");
            if (closeButtonRef.current) closeButtonRef.current.click();
        } catch (error) {
            console.error("error while creatting coupon", error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="reverse" className="bg-green-300 py-5 px-5">
                    new
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create new coupon</DialogTitle>
                    <DialogDescription>
                        Add coupon details and click save when youre done.
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <form
                        onSubmit={handleSubmit((data) =>
                            handlleCreateCoupon(data)
                        )}
                    >
                        {/* code */}
                        <div className="mb-2">
                            <label htmlFor="code" className="font-medium">
                                coupon code{" "}
                                {errors.code && (
                                    <span className="font-normal text-red-500">
                                        ({errors.code.message})
                                    </span>
                                )}
                            </label>
                            <br />
                            <input
                                type="text"
                                {...register("code", {
                                    required: {
                                        value: true,
                                        message: "required",
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Max 20 characters",
                                    },
                                    validate: (value) => {
                                        return (
                                            value.trim() !== "" ||
                                            "Cannot be empty"
                                        );
                                    },
                                })}
                                className="input-neo w-full"
                                placeholder="eg: NEWYEAR100"
                            />
                        </div>

                        {/* description */}
                        <div className="mb-2">
                            <label className="font-medium">
                                description{" "}
                                {errors.description && (
                                    <span className="font-normal text-red-500">
                                        ({errors.description.message})
                                    </span>
                                )}
                            </label>
                            <br />
                            <input
                                type="text"
                                {...register("description", {
                                    required: {
                                        value: true,
                                        message: "required",
                                    },
                                    validate: (value) => {
                                        return (
                                            value.trim() !== "" ||
                                            "Cannot be empty"
                                        );
                                    },
                                })}
                                className="input-neo w-full"
                                placeholder="description"
                            />
                        </div>

                        {/* discount */}
                        <div className="mb-2">
                            <label className="font-medium">
                                discount in %{" "}
                                {errors.discount && (
                                    <span className="font-normal text-red-500">
                                        ({errors.discount.message})
                                    </span>
                                )}
                            </label>
                            <br />
                            <input
                                type="number"
                                {...register("discount", {
                                    required: {
                                        value: true,
                                        message: "required",
                                    },
                                    validate: (value) =>
                                        (value <= 100 && value > 0) ||
                                        "should be between 0 and 100",
                                })}
                                className="input-neo w-full"
                                placeholder="discount"
                            />
                        </div>

                        {/* expiry date */}
                        <div className="mb-2">
                            <label className="font-medium">
                                expiry date{" "}
                                {errors.expiryDate && (
                                    <span className="font-normal text-red-500">
                                        ({errors.expiryDate.message})
                                    </span>
                                )}
                            </label>
                            <br />
                            <input
                                type="date"
                                {...register("expiryDate", {
                                    required: {
                                        value: true,
                                        message: "required",
                                    },
                                })}
                                className="input-neo w-full"
                            />
                        </div>

                        {/* usage limit */}
                        <div className="mb-2">
                            <label className="font-medium">
                                usage limit{" "}
                                {errors.usageLimit && (
                                    <span className="font-normal text-red-500">
                                        ({errors.usageLimit.message})
                                    </span>
                                )}
                            </label>
                            <br />
                            <input
                                type="number"
                                {...register("usageLimit", {
                                    required: {
                                        value: true,
                                        message: "required",
                                    },
                                    validate: (value) =>
                                        (value <= 10000 && value > 0) ||
                                        "should be between 0 and 10000",
                                })}
                                className="input-neo w-full"
                                placeholder="limit on how much time coupon can be used"
                            />
                        </div>

                        {/* max discount amount */}
                        <div className="mb-2">
                            <label className="font-medium">
                                max Discount amount{" "}
                                {errors.maxDiscountAmount && (
                                    <span className="font-normal text-red-500">
                                        ({errors.maxDiscountAmount.message})
                                    </span>
                                )}
                            </label>
                            <br />
                            <input
                                type="number"
                                {...register("maxDiscountAmount", {
                                    required: {
                                        value: true,
                                        message: "required",
                                    },
                                    validate: (value) =>
                                        (value <= 1000 && value > 0) ||
                                        "in range of 0 and 10000",
                                })}
                                className="input-neo w-full"
                                placeholder="max discount amount"
                            />
                        </div>

                        {/* min purchase amount */}
                        <div className="mb-2">
                            <label className="font-medium">
                                min Purchase amount{" "}
                                {errors.minPurchaseAmount && (
                                    <span className="font-normal text-red-500">
                                        ({errors.minPurchaseAmount.message})
                                    </span>
                                )}
                            </label>
                            <br />
                            <input
                                type="number"
                                {...register("minPurchaseAmount", {
                                    required: {
                                        value: true,
                                        message: "required",
                                    },
                                    validate: (value) =>
                                        (value <= 1000 && value > 0) ||
                                        "in range of 0 and 10000",
                                })}
                                className="input-neo w-full"
                                placeholder="min cart value to use this coupon"
                            />
                        </div>
                        <DialogClose ref={closeButtonRef} />
                        <DialogFooter>
                            <Button
                                type="submit"
                                disabled={
                                    errors && Object.keys(errors).length > 0
                                }
                                className="mt-2 disabled:bg-zinc-500 disabled:shadow-sm"
                            >
                                Create coupon
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CreateNewCoupon;
