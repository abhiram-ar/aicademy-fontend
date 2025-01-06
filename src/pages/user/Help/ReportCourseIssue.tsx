import NavbarOnlyLogo from "@/components/extended/NavbarOnlyLogo";
import { useForm } from "react-hook-form";
import { useGetUserBoughtCourseListQuery } from "../myLearning/myLearningApiSlice";

type formFields = {
    courseId: string;
    issueTitle: string;
    description: string;
};

const ReportCourseIssue = () => {
    const { data } = useGetUserBoughtCourseListQuery({});
    console.log(data);

    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<formFields>();
    return (
        <div>
            <NavbarOnlyLogo />

            {/* body */}
            <div className="bg-paperYellow w-full min-h-screen py-10">
                {/* content */}
                <div className="w-9/12 mx-auto border">
                    <h2 className="text-xl font-semibold bg-zinc-300 w-fit rounded-base px-2">
                        Report an Issue
                    </h2>

                    <form
                        onSubmit={handleSubmit((data) => console.log(data))}
                        className="mt-5 bg-slate-100 p-5 rounded-base max-w-[45rem] mx-auto"
                    >
                        <div className="mb-2">
                            <label
                                htmlFor="firstName"
                                className="font-semibold flex gap-2 items-baseline -mb-1 "
                            >
                                Course
                                {errors.courseId && (
                                    <p className="validation-error">
                                        ({String(errors.courseId.message)})
                                    </p>
                                )}
                            </label>
                            <div className="input-neo py-0 px-1">
                                <select defaultValue=""
                                    {...register("courseId", {
                                        required: {
                                            value: true,
                                            message: "required",
                                        },
                                    })}
                                    id=""
                                    className="w-full py-2 border-none outline-none"
                                >
                                    <option value=""  disabled>
                                        Select a course to report
                                    </option>
                                    {data &&
                                        data.boughtCourseList.map(
                                            (course: {
                                                _id: string;
                                                title: string;
                                            }) => (
                                                <option
                                                    key={course._id}
                                                    value={course._id}
                                                >
                                                    {course.title}
                                                </option>
                                            )
                                        )}
                                </select>
                            </div>
                        </div>

                        <div className="mb-2">
                            <label
                                htmlFor="firstName"
                                className="font-semibold flex gap-2 items-baseline -mb-1 "
                            >
                                Report Title
                                {errors.issueTitle && (
                                    <p className="validation-error">
                                        ({String(errors.issueTitle.message)})
                                    </p>
                                )}
                            </label>

                            <input
                                type="text"
                                {...register("issueTitle", {
                                    required: {
                                        value: true,
                                        message: "required",
                                    },
                                    maxLength: {
                                        value: 80,
                                        message: "max 80 characters",
                                    },
                                })}
                                placeholder="issue"
                                id="firstName"
                                className="input-neo w-full"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="firstName"
                                className="font-semibold flex gap-2 items-baseline"
                            >
                                Description
                                {errors.description && (
                                    <p className="validation-error">
                                        ({String(errors.description.message)})
                                    </p>
                                )}
                            </label>

                            <textarea
                                rows={4}
                                {...register("description", {
                                    required: {
                                        value: true,
                                        message: "required",
                                    },
                                    maxLength: {
                                        value: 300,
                                        message: "max 300 characters",
                                    },
                                })}
                                placeholder="Describe your issue"
                                id="firstName"
                                className="input-neo w-full"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                disabled={
                                    errors && Object.keys(errors).length > 0
                                }
                                className="bg-green-300 hover:bg-green-400 disabled:bg-zinc-400 px-3 py-1 rounded-base border-2 border-black mt-3"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReportCourseIssue;
