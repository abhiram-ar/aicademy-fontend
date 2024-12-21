import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useUpdateBasisCourseDetailsMutation } from "@/redux/features/teacher/courseCreationAPIs";

const CourseDetailsOutlet: React.FC = () => {
    const courseDetails = useOutletContext();

    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm({
        defaultValues: {
            title: courseDetails.title,
            description: courseDetails.description,
            price: courseDetails.price,
            estimatedPrice: courseDetails.estimatedPrice,
            category: courseDetails.category,
            level: courseDetails.level,
        },
    });


    console.log("outlet outlet", courseDetails);
    const [updateBasicDetails] = useUpdateBasisCourseDetailsMutation();

    const handleBasicDetailsUpdate = async (data: object) => {
        console.log(data);
        try {
            const res = await updateBasicDetails({
                ...data,
                courseId: courseDetails._id,
            });
            console.log(res);
        } catch (error) {
            console.log("error while updating course basic detals", error);
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit((data) =>
                    handleBasicDetailsUpdate(data)
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

                {/* price group */}
                <div className="grid grid-cols-2 gap-5 mt-5">
                    {/* price */}
                    <div>
                        <label
                            htmlFor="price"
                            className="font-semibold flex justify-between gap-2 items-baseline"
                        >
                            {" "}
                            <div className="flex gap-2 items-baseline">
                                Selling price in rupees
                                {errors.price && (
                                    <span className="validation-error">
                                        ({String(errors.price.message)})
                                    </span>
                                )}
                            </div>
                        </label>

                        <input
                            type="number"
                            {...register("price", {
                                required: "required",
                                max: {
                                    value: 10000,
                                    message: "Price cannot be more than 10,000",
                                },
                                min: {
                                    value: 0,
                                    message: "Price cannot be less than 0",
                                },
                            })}
                            id="price"
                            className="input-neo w-full"
                            placeholder="eg: 399"
                        />
                    </div>

                    {/* extimated price */}
                    <div>
                        <label
                            htmlFor="estimatedPrice"
                            className="font-semibold flex justify-between gap-2 items-baseline"
                        >
                            {" "}
                            <div className="flex gap-2 items-baseline">
                                Estimated price
                                {errors.estimatedPrice && (
                                    <span className="validation-error">
                                        ({String(errors.estimatedPrice.message)}
                                        )
                                    </span>
                                )}
                            </div>
                        </label>

                        <input
                            type="number"
                            {...register("estimatedPrice", {
                                required: "required",
                                max: {
                                    value: 10000,
                                    message: "Price cannot be more than 10,000",
                                },
                                min: {
                                    value: 0,
                                    message: "Price cannot be less than 0",
                                },
                            })}
                            id="estimatedPrice"
                            className="input-neo w-full"
                            placeholder="eg: 2099"
                        />
                    </div>
                </div>

                {/* category level grooup */}

                <div className="grid grid-cols-2 gap-5 mt-5">
                    {/* category */}
                    <div>
                        <label
                            htmlFor="category"
                            className="font-semibold flex justify-between gap-2 items-baseline"
                        >
                            {" "}
                            <div className="flex gap-2 items-baseline">
                                Category
                                {errors.category && (
                                    <span className="validation-error">
                                        ({String(errors.category.message)})
                                    </span>
                                )}
                            </div>
                        </label>

                        <select
                            {...register("category", {
                                required: "Select a category",
                            })}
                            defaultValue=""
                            className="input-neo appearance-none w-full"
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            <option value="softwareDevelopment">
                                Sofware Development
                            </option>
                            <option value="AIandMachineLearning">
                                AI and Machine Learning
                            </option>
                            <option value="Pychology">Pychology</option>
                            <option value="healthAndWellness">
                                Health and Wellness
                            </option>
                            <option value="personalDevelopment">
                                Personal Development
                            </option>
                        </select>
                    </div>

                    {/* level */}
                    <div>
                        <label
                            htmlFor="level"
                            className="font-semibold flex justify-between gap-2 items-baseline"
                        >
                            {" "}
                            <div className="flex gap-2 items-baseline">
                                level
                                {errors.level && (
                                    <span className="validation-error">
                                        ({String(errors.level.message)})
                                    </span>
                                )}
                            </div>
                        </label>

                        <select
                            {...register("level", {
                                required: "Select a level",
                            })}
                            defaultValue=""
                            className="input-neo appearance-none w-full"
                        >
                            <option value="" disabled>
                                Select a level
                            </option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                        </select>
                    </div>
                </div>
                <Button
                    disabled={Object.keys(errors).length !== 0 ? true : false}
                    type="submit"
                    variant="reverse"
                    className="bg-green-300 absolute right-0 mt-5"
                >
                    Save and Next
                </Button>
            </form>
        </div>
    );
};

export default CourseDetailsOutlet;
