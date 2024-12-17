import { setUser } from "@/redux/features/auth/authSlice";
import { useTeacherOnboardingMutation } from "@/redux/features/auth/teacherAuthAPI";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./../../../redux/store.ts";

const OnboardingForm: React.FC = () => {
    const [onboardTeacher, { isLoading }] = useTeacherOnboardingMutation();
    const dispatch = useDispatch();
    const teacherState = useSelector((state: RootState) => state.auth.user);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleOnboarding = async (data: object) => {
        console.log(data);
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value instanceof FileList) {
                formData.append(key, value[0]);
            } else {
                formData.append(key, (value as string).trim());
            }
        });

        try {
            await onboardTeacher(formData).unwrap();
            dispatch(setUser({ ...teacherState, isApproved: "pending" }));
        } catch (error) {
            console.error("error while onboarding", error);
        }
    };

    return (
        <div className="p-10">
            <div className="w-4/5 m-auto">
                <h2 className="text-xl font-semibold my-3  px-3 bg-zinc-300 w-fit">
                    Tell us more about yourself
                </h2>
                <form
                    onSubmit={handleSubmit((data) => {
                        handleOnboarding(data);
                    })}
                    className="bg-[#e0e7f1] border-2 border-black p-5 rounded-base "
                >
                    <div className="grid grid-cols-2 w-full gap-10">
                        <div>
                            {/* profilepic  */}
                            <div>
                                <label
                                    htmlFor="profilePic"
                                    className="font-semibold flex gap-2 items-baseline"
                                >
                                    Profile Picture
                                    {errors.profilePic?.type === "required" && (
                                        <p className="validation-error">
                                            (required)
                                        </p>
                                    )}
                                </label>

                                <input
                                    type="file"
                                    {...register("profilePic", {
                                        required: true,
                                    })}
                                    id="profilePic"
                                    className="input-neo w-full"
                                />
                            </div>

                            {/* legal name group */}
                            <div className="border border-zinc-400 bg-slate-400/30 p-3 rounded-base flex flex-col gap-3 my-5">
                                {/* legal name */}
                                <div>
                                    <label
                                        htmlFor="legalName"
                                        className="font-semibold flex gap-2 items-baseline"
                                    >
                                        Legal Name
                                        {errors.legalName?.type ===
                                            "required" && (
                                            <p className="validation-error">
                                                (required)
                                            </p>
                                        )}
                                        {errors.legalName?.type ===
                                            "validate" && (
                                            <p className="validation-error">
                                                (Cannot be empty whitespaces)
                                            </p>
                                        )}
                                    </label>

                                    <input
                                        type="text"
                                        {...register("legalName", {
                                            required: true,
                                            validate: (value) =>
                                                value.trim() !== "" || "",
                                        })}
                                        placeholder="eg: Jhon Doe K"
                                        id="legalName"
                                        className="input-neo w-full"
                                    />
                                </div>

                                {/* legal Name Proof  */}
                                <div>
                                    <label
                                        htmlFor="legalNameProof"
                                        className="font-semibold flex gap-2 items-baseline"
                                    >
                                        Identity Proof
                                        {errors.legalNameProof?.type ===
                                            "required" && (
                                            <p className="validation-error">
                                                (required)
                                            </p>
                                        )}
                                    </label>

                                    <input
                                        type="file"
                                        {...register("legalNameProof", {
                                            required: true,
                                        })}
                                        id="legalNameProof"
                                        className="input-neo w-full"
                                    />
                                </div>
                            </div>

                            {/* phone group */}
                            <div className="border border-zinc-400 rounded-base bg-slate-400/30 flex p-3 my-5  gap-3">
                                {/* country  */}
                                <div>
                                    <label
                                        htmlFor="country"
                                        className="font-semibold flex gap-2 items-baseline"
                                    >
                                        Country
                                        {errors.country?.type ===
                                            "required" && (
                                            <p className="validation-error">
                                                (required)
                                            </p>
                                        )}
                                    </label>

                                    <select className="input-neo px-5">
                                        <option>India</option>
                                    </select>
                                </div>

                                {/* phone no  */}
                                <div className="w-full">
                                    <label
                                        htmlFor="phoneNo"
                                        className="font-semibold flex gap-2 items-baseline "
                                    >
                                        Phone number
                                        {errors.phoneNo?.type ===
                                            "required" && (
                                            <p className="validation-error">
                                                (required)
                                            </p>
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
                                        className="input-neo w-full"
                                    />
                                </div>
                            </div>

                            {/* bio */}
                            <div className="w-100">
                                <label
                                    htmlFor="bio"
                                    className="font-semibold flex gap-2 items-baseline"
                                >
                                    Biography
                                    {errors.biography?.type === "required" && (
                                        <p className="validation-error">
                                            (required)
                                        </p>
                                    )}
                                </label>
                                <textarea
                                    {...register("biography", {
                                        required: true,
                                    })}
                                    className="input-neo w-full h-32"
                                    id="bio"
                                ></textarea>
                            </div>
                        </div>

                        <div>
                            {/* education  */}
                            <div>
                                <label
                                    htmlFor="education"
                                    className="font-semibold flex gap-2 items-baseline"
                                >
                                    Education
                                    {errors.education?.type === "required" && (
                                        <p className="validation-error">
                                            (required)
                                        </p>
                                    )}
                                </label>

                                <input
                                    type="text"
                                    {...register("education", {
                                        required: true,
                                    })}
                                    id="education"
                                    placeholder="eg: India"
                                    className="input-neo w-full"
                                />
                            </div>

                            {/* college  */}
                            <div className="mt-3">
                                <label
                                    htmlFor="college"
                                    className="font-semibold flex gap-2 items-baseline"
                                >
                                    College
                                    {errors.college?.type === "required" && (
                                        <p className="validation-error">
                                            (required)
                                        </p>
                                    )}
                                </label>

                                <input
                                    type="text"
                                    {...register("college", {
                                        required: true,
                                    })}
                                    id="college"
                                    placeholder="eg: India"
                                    className="input-neo w-full"
                                />
                            </div>

                            {/* qualificatin group */}
                            <div className="border border-zinc-400 rounded-base bg-slate-400/30 flex flex-col p-3 my-5  gap-3">
                                {/* qualification  */}
                                <div>
                                    <label
                                        htmlFor="college"
                                        className="font-semibold flex gap-2 items-baseline"
                                    >
                                        Qualification
                                        {errors.qualification?.type ===
                                            "required" && (
                                            <p className="validation-error">
                                                (required)
                                            </p>
                                        )}
                                    </label>

                                    <input
                                        type="text"
                                        {...register("qualification", {
                                            required: true,
                                        })}
                                        id="qualification"
                                        placeholder="eg: India"
                                        className="input-neo w-full"
                                    />
                                </div>

                                {/* qualification Proof  */}
                                <div>
                                    <label
                                        htmlFor="qualificationProof"
                                        className="font-semibold flex gap-2 items-baseline"
                                    >
                                        Qualification proof
                                        {errors.qualificationProof?.type ===
                                            "required" && (
                                            <p className="validation-error">
                                                (required)
                                            </p>
                                        )}
                                    </label>

                                    <input
                                        type="file"
                                        {...register("qualificationProof", {
                                            required: true,
                                        })}
                                        id="qualificationProof"
                                        className="input-neo w-full"
                                    />
                                </div>
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
                                    className="input-neo w-full h-24"
                                    id="remark"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`py-2 px-3 border-2 w-full  mt-5 border-black rounded-base  font-medium ${
                                    !isLoading
                                        ? "bg-orange-300   hover:bg-black hover:text-white active:bg-zinc-700"
                                        : "bg-zinc-500 hover:bg-zinc-500 hover:text-black"
                                }`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    <hr />
                </form>
            </div>
        </div>
    );
};

export default OnboardingForm;
