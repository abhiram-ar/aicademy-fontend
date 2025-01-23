import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetUserPaswordMutation } from "@/redux/features/auth/userAuthAPIs";

type Formfileds = {
    newPassword: string;
    newPassword2: string;
};

const ResetPasswordPage = () => {
    const [searchParams] = useSearchParams();
    const [resetUserPassword] = useResetUserPaswordMutation();
    const navigate = useNavigate();

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
            const token = searchParams.get("token");
            if (!token) {
                return toast.error("No token found");
            }
            const decodedToken: {
                email: string;
                role: string;
            } = jwtDecode(token);

            console.log(decodedToken);

            if (!decodedToken.role || !decodedToken.email) {
                return toast.error("Invalid token");
            }

            if (decodedToken.role === "user") {
                const res = await resetUserPassword({
                    token,
                    newPassword: data.newPassword,
                }).unwrap();
                console.log(res);
            }
            toast.success("Password updated");
            reset();
            setTimeout(() => navigate("/", { replace: true }), 2000);
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

    return (
        <div className="h-screen">
            <div className="absolute w-full">
                <Toaster position="bottom-right" />
            </div>
            <div className="py-32 bg-slate-600 h-full">
                <form
                    onSubmit={handleSubmit((data) =>
                        handlePasswordChange(data)
                    )}
                    className="w-fit mx-auto bg-slate-300 px-10 py-5 rounded-base mt-10"
                >
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
                            disabled={errors && Object.keys(errors).length > 0}
                            className="py-2 px-3 border-2 border-black bg-green-300 rounded-base font-medium hover:bg-green-400 disabled:bg-zinc-400"
                        >
                            Change password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
