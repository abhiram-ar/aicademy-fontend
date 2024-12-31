import React from "react";
import { useForm } from "react-hook-form";
import { IUserProfileDetails } from "./profilePic/ProfilePicture";
import { useUpdateUserProfileMutation } from "./profileApiSlice";
import toast from "react-hot-toast";

const ProfileForm: React.FC<IUserProfileDetails> = ({ userDetails }) => {
    const [updateUserProfile] = useUpdateUserProfileMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields },
    } = useForm({
        defaultValues: {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
        },
    });

    const handleUpdateProfile = async (data: {
        firstName: string;
        lastName: string;
    }) => {
        try {
            await updateUserProfile(data).unwrap();
            toast.success("profile updated")
        } catch (error) {
            console.error("error while updating user profie", error);
        }
    };

    return (
        <div className="w-96 mx-auto mt-3">
            
            <form
                onSubmit={handleSubmit((data) => handleUpdateProfile(data))}
                className="flex flex-col gap-4"
            >
                {/* name */}
                <div className="gap-3 justify-between">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="font-semibold flex gap-2 items-baseline"
                        >
                            first name
                            {errors.firstName && (
                                <p className="validation-error">
                                    ({String(errors.firstName.message)})
                                </p>
                            )}
                        </label>

                        <input
                            type="text"
                            {...register("firstName", {
                                required: { value: true, message: "required" },
                                pattern: {
                                    value: /^[A-Z]+$/i,
                                    message:
                                        "name should only contain alphabets",
                                },
                            })}
                            placeholder="eg: Jhon"
                            id="firstName"
                            className="input-neo w-full"
                        />
                    </div>
                    {/* lastname */}
                    <div className="mt-3">
                        <label
                            htmlFor="lastName"
                            className="font-semibold flex gap-2 items-baseline "
                        >
                            last name
                            {errors.lastName && (
                                <p className="validation-error">
                                    ({String(errors.lastName.message)})
                                </p>
                            )}
                        </label>

                        <input
                            type="text"
                            {...register("lastName", {
                                pattern: {
                                    value: /^[A-Z]+$/i,
                                    message:
                                        "name should only contain alphabets",
                                },
                            })}
                            placeholder="eg: Doe"
                            id="lastName"
                            className="input-neo w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={
                            (errors && Object.keys(errors).length > 0) ||
                            Object.keys(dirtyFields).length === 0
                        }
                        className="bg-green-300  px-5 py-1 mt-4 rounded-base border-2 border-zinc-600 block mx-auto hover:bg-green-400 disabled:bg-zinc-300"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileForm;
