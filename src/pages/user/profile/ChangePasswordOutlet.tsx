import React from "react";
import { useForm } from "react-hook-form";

const ChangePasswordOutlet = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const newPassword = watch("newPassword");
    console.log(newPassword);

    return (
        <div>
            <form
                onSubmit={handleSubmit((data) => console.log(data))}
                className="flex flex-col gap-4"
            >
                {/*old password */}
                <div>
                    <label
                        htmlFor="oldPassword"
                        className="font-semibold flex gap-2 items-baseline"
                    >
                        password
                        {errors.oldPassword && (
                            <p className="validation-error">
                                ({String(errors.oldPassword.message)})
                            </p>
                        )}
                    </label>
                    <input
                        type="password"
                        {...register("oldPassword", {
                            required: { value: true, message: "required" },
                            minLength: {
                                value: 8,
                                message: "8 characters required",
                            },
                        })}
                        placeholder="current password"
                        id="oldPassword"
                        className="input-neo w-80"
                    />
                </div>

                {/*new password */}
                <div>
                    <label
                        htmlFor="newPassword"
                        className="font-semibold flex gap-2 items-baseline"
                    >
                        password
                        {errors.newPassword && (
                            <p className="validation-error">
                                ({String(errors.newPassword?.message)})
                            </p>
                        )}
                    </label>
                    <input
                        type="password"
                        {...register("newPassword", {
                            required: { value: true, message: "required" },
                            minLength: {
                                value: 8,
                                message: "8 characters required",
                            },
                        })}
                        placeholder="new password"
                        id="newPassword"
                        className="input-neo w-80"
                    />
                </div>

                {/*new password */}
                <div>
                    <label
                        htmlFor="newPassword2"
                        className="font-semibold flex gap-2 items-baseline"
                    >
                        password
                        {errors.newPassword2 && (
                            <p className="validation-error">
                                ({String(errors.newPassword2?.message)})
                            </p>
                        )}
                    </label>
                    <input
                        type="password"
                        {...register("newPassword2", {
                            required: { value: true, message: "required" },
                            minLength: {
                                value: 8,
                                message: "8 characters required",
                            },
                            validate: (value) => value === newPassword || "passwords don't match"
                        })}
                        placeholder="confirm new password"
                        id="newPassword2"
                        className="input-neo w-80"
                    />
                </div>

                <button
                    type="submit"
                    className="py-2 px-3 border-2 border-black bg-white rounded-base w-full font-medium hover:bg-black hover:text-white active:bg-zinc-700"
                >
                    Login
                </button>
            </form>
            <button>forget password</button>
        </div>
    );
};

export default ChangePasswordOutlet;
