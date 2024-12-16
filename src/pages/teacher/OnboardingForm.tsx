import React from "react";
import { useForm } from "react-hook-form";

interface Props {
    handleOnboarding: (data: object) => void;
}

const OnboardingForm: React.FC<Props> = ({ handleOnboarding }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    console.log(errors);
    return (
        <div>
            <form
                onSubmit={handleSubmit((data) => {
                    handleOnboarding(data);
                })}
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
                            {errors.legalName?.type === "validate" && (
                                <p className="validation-error">
                                    (Cannot be empty whitespaces)
                                </p>
                            )}
                        </label>

                        <input
                            type="text"
                            {...register("legalName", {
                                required: true,
                                validate: (value) => value.trim() !== "" || "",
                            })}
                            placeholder="eg: Jhon Doe K"
                            id="legalName"
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
                        className="input-neo"
                    />
                </div>

                {/* country  */}
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

                    <select className="input-neo px-5">
                        <option>India</option>
                    </select>
                </div>

                {/* phone no  */}
                <div>
                    <label
                        htmlFor="phoneNo"
                        className="font-semibold flex gap-2 items-baseline"
                    >
                        Phone number
                        {errors.phoneNo?.type === "required" && (
                            <p className="validation-error">(required)</p>
                        )}
                        {errors.phoneNo?.type === "pattern" && (
                            <p className="validation-error">
                                (Invalid phone number)
                            </p>
                        )}
                    </label>

                    <input
                        type="text"
                        {...register("phoneNo", {
                            required: true,
                            pattern: /^[1-9]\d{9}$/,
                        })}
                        id="phoneNo"
                        placeholder="eg: 9940123123"
                        className="input-neo "
                    />
                </div>

                {/* bio */}
                <div>
                    <label
                        htmlFor="bio"
                        className="font-semibold flex gap-2 items-baseline"
                    >
                        Biography
                        {errors.biography?.type === "required" && (
                            <p className="validation-error">(required)</p>
                        )}
                    </label>
                    <textarea
                        {...register("biography", { required: true })}
                        className="input-neo"
                        id="bio"
                    ></textarea>
                </div>

                {/* education  */}
                <div>
                    <label
                        htmlFor="education"
                        className="font-semibold flex gap-2 items-baseline"
                    >
                        Education
                        {errors.education?.type === "required" && (
                            <p className="validation-error">(required)</p>
                        )}
                    </label>

                    <input
                        type="text"
                        {...register("education", {
                            required: true,
                        })}
                        id="education"
                        placeholder="eg: India"
                        className="input-neo "
                    />
                </div>

                {/* college  */}
                <div>
                    <label
                        htmlFor="college"
                        className="font-semibold flex gap-2 items-baseline"
                    >
                        College
                        {errors.college?.type === "required" && (
                            <p className="validation-error">(required)</p>
                        )}
                    </label>

                    <input
                        type="text"
                        {...register("college", {
                            required: true,
                        })}
                        id="college"
                        placeholder="eg: India"
                        className="input-neo "
                    />
                </div>

                {/* qualification  */}
                <div>
                    <label
                        htmlFor="college"
                        className="font-semibold flex gap-2 items-baseline"
                    >
                        Qualification
                        {errors.qualification?.type === "required" && (
                            <p className="validation-error">(required)</p>
                        )}
                    </label>

                    <input
                        type="text"
                        {...register("qualification", {
                            required: true,
                        })}
                        id="qualification"
                        placeholder="eg: India"
                        className="input-neo "
                    />
                </div>

                {/* qualification Proof  */}
                <div>
                    <label
                        htmlFor="qualificationProof"
                        className="font-semibold flex gap-2 items-baseline"
                    >
                        Identity Proof
                        {errors.qualificationProof?.type === "required" && (
                            <p className="validation-error">(required)</p>
                        )}
                    </label>

                    <input
                        type="file"
                        {...register("qualificationProof", {
                            required: true,
                        })}
                        id="qualificationProof"
                        className="input-neo "
                    />
                </div>

                {/* remark */}
                <div>
                    <label
                        htmlFor="remark"
                        className="font-semibold flex gap-2 items-baseline"
                    >
                        Remark
                    </label>
                    <textarea
                        {...register("remark", { required: true })}
                        className="input-neo"
                        id="remark"
                    ></textarea>
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
