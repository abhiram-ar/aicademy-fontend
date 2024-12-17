import AuthBlock from "../base/AuthBlock";
import { useForm } from "react-hook-form";
import SignInWithGoogle from "./SignInWithGoogle";
import React from "react";
import { GoogleAuthRoles } from "./SignInWithGoogle";

interface Props {
    handleLogin: (data: object) => void;
    enableSocialAuth?: boolean;
    role: GoogleAuthRoles | "admin"
}

const Login: React.FC<Props> = ({ handleLogin, enableSocialAuth = true, role  }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <AuthBlock>
            <form
                onSubmit={handleSubmit((data) => handleLogin(data))}
                className="flex flex-col gap-4"
            >
                {/* email */}
                <div>
                    <label
                        htmlFor="email"
                        className="font-semibold flex gap-2 items-baseline"
                    >
                        email
                        {errors.email?.type === "required" && (
                            <p className="validation-error">
                                (Email is required)
                            </p>
                        )}
                        {errors.email?.type === "pattern" && (
                            <p className="validation-error">(Invalid email)</p>
                        )}
                    </label>

                    <input
                        type="text"
                        {...register("email", {
                            required: true,
                            pattern:
                                // eslint-disable-next-line no-useless-escape
                                /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/,
                        })}
                        placeholder="email"
                        id="email"
                        className="input-neo w-80"
                    />
                </div>

                {/* password */}
                <div>
                    <label
                        htmlFor="password"
                        className="font-semibold flex gap-2 items-baseline"
                    >
                        password
                        {errors.password?.type === "required" && (
                            <p className="validation-error">
                                (password is required)
                            </p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p className="validation-error">
                                (8 characters required)
                            </p>
                        )}
                    </label>
                    <input
                        type="password"
                        {...register("password", {
                            required: true,
                            minLength: 8,
                        })}
                        placeholder="password"
                        id="password"
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
            {enableSocialAuth || role!== "admin" && (
                <>
                    <div className="flex justify-between items-center my-5">
                        <hr className="text-black border border-black w-2/5" />
                        OR
                        <hr className="text-black border border-black w-2/5" />
                    </div>
                    <SignInWithGoogle gAuthRole={role}/>
                </>
            )}
        </AuthBlock>
    );
};

export default Login;
