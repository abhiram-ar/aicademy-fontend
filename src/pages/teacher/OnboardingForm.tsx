import { useForm } from "react-hook-form";

const OnboardingForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <div>
            <form
                onSubmit={handleSubmit((data) => console.log(data))}
                className=""
            >
                <div className="">
                    {/* profilepic  */}
                    <div>
                        <label
                            htmlFor="profilePic"
                            className="font-semibold flex gap-2 items-baseline"
                        >
                            Profile Picture
                            {errors.profilePic?.type === "required" && (
                                <p className="validation-error">(required)</p>
                            )}
                        </label>

                        <input
                            type="file"
                            {...register("profilePic", {
                                required: true,
                            })}
                            id="profilePic"
                            className="input-neo "
                        />
                    </div>

                    {/* legal name */}
                    <div>
                        <label
                            htmlFor="legalName"
                            className="font-semibold flex gap-2 items-baseline"
                        >
                            Legal Name
                            {errors.legalName?.type === "required" && (
                                <p className="validation-error">(required)</p>
                            )}
                        </label>

                        <input
                            type="text"
                            {...register("legalName")}
                            placeholder="eg: Jhon Doe K"
                            id="lastName"
                            className="input-neo"
                        />
                    </div>
                </div>

                {/* legal Name Proof  */}
                <div>
                    <label
                        htmlFor="legalNameProof"
                        className="font-semibold flex gap-2 items-baseline"
                    >
                        Identity Proof
                        {errors.legalNameProof?.type === "required" && (
                            <p className="validation-error">(required)</p>
                        )}
                    </label>

                    <input
                        type="file"
                        {...register("legalNameProof", {
                            required: true,
                        })}
                        id="legalNameProof"
                        className="input-neo "
                    />
                </div>

                {/* legal Name Proof  */}
                <div>
                    <label
                        htmlFor="country"
                        className="font-semibold flex gap-2 items-baseline"
                    >
                        Country
                        {errors.country?.type === "required" && (
                            <p className="validation-error">(required)</p>
                        )}
                    </label>

                    <input
                        type="text"
                        {...register("country", {
                            required: true,
                        })}
                        id="country"
                        placeholder="eg: India"
                        className="input-neo "
                    />
                </div>

                {/* legal Name Proof  */}
                <div>
                    <label
                        htmlFor="phoneNo"
                        className="font-semibold flex gap-2 items-baseline"
                    >
                        Phone number
                        {errors.phoneNo?.type === "required" && (
                            <p className="validation-error">(required)</p>
                        )}
                    </label>

                    <input
                        type="file"
                        {...register("phoneNo", {
                            required: true
                        })}
                        id="phoneNo"
                        placeholder="eg: 9940123123"
                        className="input-neo "
                    />
                </div>

                {/* bio */}
                <textarea className="input-neo"></textarea>

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
                    className={`py-2 px-3 border-2 border-black rounded-base font-medium ${"bg-zinc-500 hover:bg-zinc-500 hover:text-black"}`}
                >
                    Sign up
                </button>
            </form>
        </div>
    );
};

export default OnboardingForm;
