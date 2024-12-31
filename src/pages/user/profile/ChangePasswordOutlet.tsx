import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useChangeUserPasswordMutation } from "./profileApiSlice";
import { useState } from "react";
import { useResetUserPaswordMutation } from "@/redux/features/auth/userAuthAPIs";

type Formfileds = {
    oldPassword: string;
    newPassword: string;
    newPassword2: string;
};

const ChangePasswordOutlet = () => {
    const [email, setEmail] = useState("");
    const [forgetPasswordState, setForgetPasswordState] = useState(false);
    const [changePassword] = useChangeUserPasswordMutation();
    const [resetPassword] = useResetUserPaswordMutation();
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<Formfileds>();

    const newPassword = watch("newPassword");

    const handlePasswordChange = async (data: Formfileds) => {
        console.log(data);
        try {
            const res = await changePassword({
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            }).unwrap();
            console.log(res);
            toast.success("Password updated");
            reset();
        } catch (error) {
            console.error("error while changing user password", error);

            // Cast the error to match RTK Query's error format
            const err = error as {
                data?: { message: string };
                status?: number;
            };
            if (err.data) toast.error(err.data?.message);
            else toast.error("Failed to change password");
        }
    };

    const handleForgetPassword = async () => {
        try {
            const res = await resetPassword({ email }).unwrap();
            console.log(`forget result`, res);
            toast.success(`Recovery mail send to ${email}`);
            setEmail("")
        } catch (error) {
            console.error("error while resetting password", error);
            toast.error("failed to reset password");
        }
    };

    return (
        <div className="border border-black rounded-base py-10 bg-zinc-50">
            <Toaster position="bottom-right" />

            {!forgetPasswordState ? (
                <div>
                    <form
                        onSubmit={handleSubmit((data) =>
                            handlePasswordChange(data)
                        )}
                        className="w-fit mx-auto"
                    >
                        {/*old password */}
                        <div>
                            <label
                                htmlFor="oldPassword"
                                className="font-semibold flex gap-2 items-baseline"
                            >
                                current password
                                {errors.oldPassword && (
                                    <p className="validation-error">
                                        ({String(errors.oldPassword.message)})
                                    </p>
                                )}
                            </label>
                            <input
                                type="password"
                                {...register("oldPassword", {
                                    required: {
                                        value: true,
                                        message: "required",
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "8 characters required",
                                    },
                                })}
                                placeholder="current password"
                                id="oldPassword"
                                className="input-neo w-96"
                            />
                        </div>

                        {/*new password */}
                        <div className="mt-5">
                            <label
                                htmlFor="newPassword"
                                className="font-semibold flex gap-2 items-baseline"
                            >
                                new password
                                {errors.newPassword && (
                                    <p className="validation-error">
                                        ({String(errors.newPassword?.message)})
                                    </p>
                                )}
                            </label>
                            <input
                                type="password"
                                {...register("newPassword", {
                                    required: {
                                        value: true,
                                        message: "required",
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "8 characters required",
                                    },
                                })}
                                placeholder="new password"
                                id="newPassword"
                                className="input-neo w-96"
                            />
                        </div>

                        {/*new password */}
                        <div className="mt-2">
                            <label
                                htmlFor="newPassword2"
                                className="font-semibold flex gap-2 items-baseline"
                            >
                                confirm new password
                                {errors.newPassword2 && (
                                    <p className="validation-error">
                                        ({String(errors.newPassword2?.message)})
                                    </p>
                                )}
                            </label>
                            <input
                                type="password"
                                {...register("newPassword2", {
                                    required: {
                                        value: true,
                                        message: "required",
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "8 characters required",
                                    },
                                    validate: (value) =>
                                        value === newPassword ||
                                        "passwords don't match",
                                })}
                                placeholder="confirm new password"
                                id="newPassword2"
                                className="input-neo w-96"
                            />
                        </div>
                        <div className="flex justify-center mt-3">
                            <button
                                type="submit"
                                disabled={
                                    errors && Object.keys(errors).length > 0
                                }
                                className="py-2 px-3 border-2 border-black bg-green-300 rounded-base font-medium hover:bg-green-400 disabled:bg-zinc-400"
                            >
                                Change password
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-col items-center mt-10 ">
                        <button
                            onClick={() => setForgetPasswordState(true)}
                            className="font-publicSans text-zinc-500 mx-auto hover:text-black underline"
                        >
                            Forget password?
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col w-fit mx-auto">
                    <div>
                        <label className="font-medium" htmlFor="email">
                            email
                        </label>
                        <br />
                        <input
                            type="email"
                            value={email}
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="enter your email"
                            className="input-neo w-96"
                        />
                    </div>
                    <button
                        onClick={handleForgetPassword}
                        className="bg-green-300 hover:bg-green-400 border-2 border-black py-2 px-3 rounded-base font-medium mt-2"
                    >
                        Reset password
                    </button>

                    <button
                        className="font-publicSans text-zinc-500 mx-auto hover:text-black underline mt-3 "
                        onClick={() => setForgetPasswordState(false)}
                    >
                        change Password?
                    </button>
                </div>
            )}
        </div>
    );
};

export default ChangePasswordOutlet;
