import { Button } from "@/components/ui/button";
import { useCreateCourseDraftMutation } from "@/redux/features/teacher/courseCreationAPIs";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateDraftForm = () => {
    const [createDraft] = useCreateCourseDraftMutation();
    const navigate = useNavigate();

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const handleCreateDraft = async (data: object) => {
        console.log("data", data);
        try {
            const response = await createDraft(data).unwrap();
            navigate(`/teach/course/draft/${response.courseId}`);
        } catch (error) {
            console.error(`error while creating draft`, error);
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit((data) =>
                    handleCreateDraft(data as object)
                )}
                className="relative w-fit mx-auto mt-10"
            >
                {/* title */}
                <div className="w-fit">
                    <label
                        htmlFor="title"
                        className=" font-semibold flex justify-between gap-2 items-baseline"
                    >
                        {" "}
                        <div className="flex gap-2 items-baseline">
                            Course Title
                            <span className="validation-error">
                                {errors.title?.type === "required" &&
                                    "(required)"}
                            </span>
                        </div>
                        <p
                            className={`validation-error ${
                                errors.title?.type === "maxLength"
                                    ? " "
                                    : "text-zinc-500"
                            }`}
                        >
                            Max 100 characters
                        </p>
                    </label>
                    <input
                        type="text"
                        {...register("title", {
                            required: "is required",
                            maxLength: 100,
                        })}
                        className="input-neo w-[50rem]"
                        id="title"
                        placeholder="eg: Introduction to Javascript"
                    />
                </div>

                {/* description */}
                <div className="w-fit mt-5">
                    <label
                        htmlFor="description"
                        className="font-semibold flex justify-between gap-2 items-baseline"
                    >
                        {" "}
                        <div className="flex gap-2 items-baseline">
                            Course description
                            <span className="validation-error">
                                {errors.description?.type === "required" &&
                                    "(required)"}
                            </span>
                        </div>
                        <p
                            className={`validation-error ${
                                errors.description?.type === "maxLength"
                                    ? " "
                                    : "text-zinc-500"
                            }`}
                        >
                            Max 300 characters
                        </p>
                    </label>
                    <textarea
                        {...register("description", {
                            required: "is required",
                            maxLength: 300,
                        })}
                        id="title"
                        rows={10}
                        placeholder="eg: Master the fundamentals of JavaScript, the world's most popular programming language for web development. This course covers essential topics like variables, functions, loops, DOM manipulation, and modern ES6+ features. Learn to create dynamic, interactive websites and build a strong foundation for advanced frameworks like React, Angular, or Node.js. Perfect for beginners and aspiring developers!"
                        className="input-neo w-[50rem]"
                    />
                </div>

                <Button
                    disabled={Object.keys(errors).length !== 0 ? true : false}
                    type="submit"
                    variant="reverse"
                    className="bg-green-50 absolute right-0 mt-5"
                >
                    Save and Next
                </Button>
            </form>
        </div>
    );
};

export default CreateDraftForm;
