import React, { Fragment } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    useGetAllCourseVideosQuery,
    useUpdateBasisCourseDetailsMutation,
} from "@/redux/features/teacher/courseCreationAPIs";
import Thumbnail from "./Thumbnail";
import { ICourse } from "../CourseDraft";
import { Plus, X } from "lucide-react";
import { Ivideo } from "../course-assets/CourseAssetsOutlet";

type FormData = {
    title: string;
    description: string;
    createdBy: string;
    courseState: "draft" | "published" | "unpublished";
    price?: number;
    estimatedPrice?: number;
    thumbnail?: {
        public_id: string;
        url: string;
    };
    category?: string;
    level?: "beginner" | "intermediate" | "advanced";
    benefits: { value: string }[];
    prerequisites: { value: string }[];
    demoVideoKey: string;
};

const categories: { displayName: string; value: string }[] = [
    {
        displayName: "Web development",
        value: "webDevelopment",
    },
    {
        displayName: "AI/ML",
        value: "aiml",
    },
    {
        displayName: "Data science",
        value: "datascience",
    },
    {
        displayName: "Database",
        value: "database",
    },
    {
        displayName: "Personal deveopment",
        value: "personalDevelopment",
    },
    {
        displayName: "Health and Fitness",
        value: "healthAndWellness",
    },
    {
        displayName: "Editing",
        value: "editing",
    },
    {
        displayName: "other",
        value: "other",
    },
];

const CourseDetailsOutlet: React.FC = () => {
    const courseDetails: ICourse = useOutletContext();
    const { id } = useParams();

    const { currentData: content } = useGetAllCourseVideosQuery({
        courseId: id,
    });

    const normalizeFormData = (data: string[]): { value: string }[] => {
        const res = data.map((item) => ({ value: item }));
        console.log(`transformed array`, res);
        return res;
    };

    const {
        handleSubmit,
        formState: { errors },
        control,
        register,
    } = useForm<FormData>({
        defaultValues: {
            title: courseDetails.title,
            description: courseDetails.description,
            demoVideoKey: courseDetails.demoVideoKey || "",
            price: courseDetails.price,
            estimatedPrice: courseDetails.estimatedPrice,
            category: courseDetails.category,
            level: courseDetails.level,
            benefits:
                courseDetails?.benefits && courseDetails.benefits?.length > 0
                    ? normalizeFormData(courseDetails.benefits)
                    : [{ value: "" }],
            prerequisites:
                courseDetails.prerequisites &&
                courseDetails.prerequisites.length > 0
                    ? normalizeFormData(courseDetails.prerequisites)
                    : [{ value: "" }],
        },
    });

    const {
        fields: benefitsFields,
        append: appendBenefit,
        remove: removeBenefit,
    } = useFieldArray({
        control,
        name: "benefits" as never,
    });

    const {
        fields: prerequisitesFields,
        append: appendPrerequisite,
        remove: removePrerequisite,
    } = useFieldArray({
        control,
        name: "prerequisites" as never,
    });
    const [updateBasicDetails] = useUpdateBasisCourseDetailsMutation();
    const handleBasicDetailsUpdate = async (data: FormData) => {
        console.log(`form data `, data);

        const modifiedFormdata = {
            ...data,
            benefits: data.benefits.map((benifit) => benifit.value),
            prerequisites: data.prerequisites.map(
                (prerequisites) => prerequisites.value
            ),
        };

        console.log("modifed form data", modifiedFormdata);

        try {
            const res = await updateBasicDetails({
                ...modifiedFormdata,
                courseId: courseDetails._id,
            });
            console.log(res);
        } catch (error) {
            console.log("error while updating course basic detals", error);
        }
    };

    return (
        <div>
            <Thumbnail courseDetails={courseDetails} />
            <form
                onSubmit={handleSubmit((data) =>
                    handleBasicDetailsUpdate(data)
                )}
                className="relative w-fit mx-auto mt-5 bg-white border py-5 px-10 mb-10 rounded-base"
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
                        rows={5}
                        placeholder="eg: Master the fundamentals of JavaScript, the world's most popular programming language for web development. This course covers essential topics like variables, functions, loops, DOM manipulation, and modern ES6+ features. Learn to create dynamic, interactive websites and build a strong foundation for advanced frameworks like React, Angular, or Node.js. Perfect for beginners and aspiring developers!"
                        className="input-neo w-[50rem]"
                    />
                </div>

                {/* demovideo */}
                <label
                    htmlFor="category"
                    className="font-semibold flex justify-between gap-2 items-baseline mb-1 mt-2"
                >
                    {" "}
                    <div className="flex gap-2 items-baseline">
                        Demo Video
                        {errors?.demoVideoKey && (
                            <span className="validation-error">
                                ({String(errors?.demoVideoKey.message)})
                            </span>
                        )}
                    </div>
                </label>
                <div className="bg-white rounded-base p-2 border-2 border-black">
                    {courseDetails && content && (
                        <select
                            {...register("demoVideoKey", {
                                required: {
                                    value: true,
                                    message: "select a video",
                                },
                            })}
                            id="demoVideo"
                            className="w-full border-none outline-none"
                        >
                            <option value="" disabled>
                                Select video for lesson
                            </option>
                            {/* selected video to redner by default */}
                            {/* {courseDetails.demoVideoKey && (
                                <option value={courseDetails.demoVideoKey}>
                                    {courseDetails.demoVideoKey
                                        .split("-")
                                        .slice(1)
                                        .join("")}
                                </option>
                            )} */}
                            {content.courseVideos
                                .filter(
                                    (video: { transcodingStatus: string }) =>
                                        video.transcodingStatus === "completed"
                                )
                                .map((video: Ivideo) => (
                                    <Fragment key={video._id}>
                                        {
                                            <option value={video.key}>
                                                {video.displayName}
                                            </option>
                                        }
                                    </Fragment>
                                ))}
                        </select>
                    )}
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
                            {categories.map((category) => (
                                <option
                                    key={category.value}
                                    value={category.value}
                                >
                                    {category.displayName}
                                </option>
                            ))}
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

                {/* benifits filed */}
                <h3 className="font-semibold flex justify-between gap-2 items-baseline mt-5">
                    Benefits
                </h3>
                <div className="bg-slate-100 px-5 py-2 rounded-base">
                    {benefitsFields.map((benefit, benefitIndex) => (
                        // chapter section
                        <div key={benefit.id} className="mt-2">
                            {/* chapter title */}
                            <div className="w-full  flex justify-center items-center gap-3">
                                <input
                                    type="text"
                                    {...register(
                                        `benefits.${benefitIndex}.value`,
                                        {
                                            required: {
                                                value: true,
                                                message: "required",
                                            },
                                            maxLength: {
                                                value: 70,
                                                message: "max 70 characters",
                                            },
                                        }
                                    )}
                                    className={`input-neo w-full ${
                                        errors?.benefits?.[benefitIndex]
                                            ?.value &&
                                        " border-2 border-red-500 "
                                    }`}
                                    placeholder={`benifit ${benefitIndex + 1}`}
                                />
                                <button
                                    type="button"
                                    title="delete course"
                                    disabled={benefitsFields.length <= 1}
                                    onClick={() => removeBenefit(benefitIndex)}
                                >
                                    <X
                                        className={` ${
                                            benefitsFields.length <= 1
                                                ? "opacity-10"
                                                : " text-zinc-500 hover:text-red-500 "
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-between items-center mt-3">
                        <button
                            type="button"
                            className="bg-white px-3 py-1 rounded-base border-2 flex justify-center items-center gap-2 hover:bg-slate-300"
                            onClick={() => appendBenefit("")}
                        >
                            <Plus className="size-4" />
                            Add benefits
                        </button>
                    </div>
                </div>
                {/* end benifits fied */}

                {/* prerequsires filed */}
                <h3 className="font-semibold flex justify-between gap-2 items-baseline mt-5">
                    Prerequisites
                </h3>
                <div className="bg-slate-100 px-5 py-2 rounded-base">
                    {prerequisitesFields.map(
                        (prerequisites, prerequisitesIndex) => (
                            // chapter section
                            <div key={prerequisites.id} className="mt-2">
                                {/* chapter title */}
                                <div className="w-full  flex justify-center items-center gap-3">
                                    <input
                                        type="text"
                                        {...register(
                                            `prerequisites.${prerequisitesIndex}.value`,
                                            {
                                                required: {
                                                    value: true,
                                                    message: "required",
                                                },
                                                maxLength: {
                                                    value: 70,
                                                    message:
                                                        "max 70 characters",
                                                },
                                            }
                                        )}
                                        className={`input-neo w-full ${
                                            errors?.prerequisites?.[
                                                prerequisitesIndex
                                            ]?.value &&
                                            " border-2 border-red-500 "
                                        }`}
                                        placeholder={`benifit ${
                                            prerequisitesIndex + 1
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        title="delete course"
                                        disabled={
                                            prerequisitesFields.length <= 1
                                        }
                                        onClick={() =>
                                            removePrerequisite(
                                                prerequisitesIndex
                                            )
                                        }
                                    >
                                        <X
                                            className={` ${
                                                prerequisitesFields.length <= 1
                                                    ? "opacity-10"
                                                    : " text-zinc-500 hover:text-red-500 "
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        )
                    )}
                    <div className="flex justify-between items-center mt-3">
                        <button
                            type="button"
                            className="bg-white px-3 py-1 rounded-base border-2 flex justify-center items-center gap-2 hover:bg-slate-300"
                            onClick={() => appendPrerequisite("")}
                        >
                            <Plus className="size-4" />
                            Add prerequisites
                        </button>
                    </div>
                </div>
                {/* end pre-requisites fied */}

                <div className="flex justify-end my-5">
                    <Button
                        disabled={
                            Object.keys(errors).length !== 0 ? true : false
                        }
                        type="submit"
                        variant="reverse"
                        className="bg-green-300"
                    >
                        Save and Next
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CourseDetailsOutlet;
