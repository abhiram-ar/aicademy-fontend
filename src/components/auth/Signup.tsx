import AuthBlock from "../base/AuthBlock";
import { useForm } from "react-hook-form";
import SignInWithGoogle from "./SignInWithGoogle";

export interface newUser {
    firstName: string,
    lastName:string,
    email:string,
    password: string
}


interface Props {
    handleSignup: (data: newUser) => void;
}

const Signup: React.FC<Props> = ({ handleSignup }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <AuthBlock>
            <form
                onSubmit={handleSubmit((data) => handleSignup(data as newUser))}
                className="flex flex-col gap-4"
            >
                {/* name */}
                <div className="flex gap-3 justify-between">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="font-semibold flex gap-2 items-baseline"
                        >
                            first name
                            {errors.firstName?.type === "required" && (
                                <p className="validation-error">(required)</p>
                            )}
                        </label>

                        <input
                            type="text"
                            {...register("firstName", {
                                required: true,
                            })}
                            placeholder="eg: Jhon"
                            id="firstName"
                            className="input-neo "
                        />
                    </div>
                    {/* lastname */}
                    <div>
                        <label
                            htmlFor="lastName"
                            className="font-semibold flex gap-2 items-baseline"
                        >
                            last name
                        </label>

                        <input
                            type="text"
                            {...register("lastName")}
                            placeholder="eg: Doe"
                            id="lastName"
                            className="input-neo"
                        />
                    </div>
                </div>

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
                        placeholder="eg: jhon@email.com"
                        id="email"
                        className="input-neo w-full"
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
                        className="input-neo w-full"
                    />
                </div>

                <button
                    type="submit"
                    className="py-2 px-3 border-2 border-black bg-white rounded-base w-full font-medium hover:bg-black hover:text-white active:bg-zinc-700"
                >
                    Sign up
                </button>
            </form>
            <div className="flex justify-between items-center my-5">
                <hr className="text-black border border-black w-2/5" />
                OR
                <hr className="text-black border border-black w-2/5" />
            </div>
            <SignInWithGoogle />
        </AuthBlock>
    );
};

export default Signup;
