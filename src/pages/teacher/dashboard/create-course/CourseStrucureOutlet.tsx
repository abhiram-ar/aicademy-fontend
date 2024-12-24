import { Button } from "@/components/ui/button";
import { FilePlus2, FileX2, PackageMinus, PackagePlus } from "lucide-react";
import React from "react";
import { Ivideo } from "./CourseAssetsOutlet";
import { ICourse } from "./CourseDraft";
import {
    useGetAllCourseVideosQuery,
    useUpdateCouseStructureMutation,
} from "@/redux/features/teacher/courseCreationAPIs";
import {
    useForm,
    useFieldArray,
    Control,
    UseFormRegister,
    FieldErrors,
} from "react-hook-form";
import { useOutletContext, useParams } from "react-router-dom";

interface formValue  {
    chapters: {
        chapterTitle: string;
        lessons: {
            lessonTitle: string;
            videoKey: string;
        }[];
    }[];
};

const CourseStrucureOutlet = () => {
    const courseDetails: ICourse = useOutletContext();

    const emptyChapterPlaceholder = [
        {
            chapterTitle: "",
            lessons: [{ lessonTitle: "", videoKey: "" }],
        },
    ];

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<formValue>({
        defaultValues: {
            chapters:
                courseDetails.chapters?.length !== 0
                    ? courseDetails.chapters
                    : emptyChapterPlaceholder,
        },
    });

    const {
        fields: chapterFields,
        append: appendChapter,
        remove: removeChapter,
    } = useFieldArray({
        control,
        name: "chapters",
    });

    const [updateCourseStructure] = useUpdateCouseStructureMutation();

    const handleStructureUpdate = async (data: formValue) => {
        console.log(data);
        try {
            const res = await updateCourseStructure({
                courseId: courseDetails._id,
                chapters: data.chapters,
            });
            console.log("update res", res);
        } catch (error) {
            console.error(`error while updating course sturucture`, error);
        }
    };

    console.log(`structure errors`, errors);

    return (
        <div>
            <form
                onSubmit={handleSubmit((data) =>
                    handleStructureUpdate(data as formValue)
                )}
                className="w-fit mx-auto"
            >
                {chapterFields.map((chapter, chapterIndex) => (
                    // chapter section
                    <div
                        key={chapter.id}
                        className="bg-white m-5 border-2  rounded-base py-5 px-8 w-fit mx-auto mt-10 relative"
                    >
                        <h1 className="font-semibold text-zinc-500 text-center text-xl">
                            Chapter {chapterIndex + 1}
                        </h1>

                        {/* chapter title */}
                        <div>
                            <label
                                htmlFor="category"
                                className="font-semibold flex justify-between gap-2 items-baseline"
                            >
                                {" "}
                                <div className="flex gap-2 items-baseline">
                                    Chapter Title
                                    {errors?.chapters?.[chapterIndex]
                                        ?.chapterTitle && (
                                        <span className="validation-error">
                                            (
                                            {String(
                                                errors?.chapters?.[chapterIndex]
                                                    ?.chapterTitle.message
                                            )}
                                            )
                                        </span>
                                    )}
                                </div>
                            </label>
                            <input
                                type="text"
                                {...register(
                                    `chapters.${chapterIndex}.chapterTitle`,
                                    {
                                        required: "required",
                                        maxLength: {
                                            value: 70,
                                            message: "max 70 characters",
                                        },
                                    }
                                )}
                                className="input-neo w-[50rem] border-zinc-300"
                            />
                        </div>
                        {chapterFields.length > 1 && (
                            <button
                                type="button"
                                title="delete course"
                                onClick={() => removeChapter(chapterIndex)}
                                className="absolute top-5 right-5 "
                            >
                                <PackageMinus className="text-zinc-400 hover:text-red-500" />
                            </button>
                        )}

                        {/* lesson component */}
                        <h3 className="font-semibold text-zinc-500 mt-3 mb-1">
                            Lessons
                        </h3>

                        <div>
                            <LessonForm
                                register={register}
                                errors={errors}
                                control={control}
                                chapterIndex={chapterIndex}
                            />
                        </div>
                    </div>
                ))}
                <div className="flex justify-between items-center">
                    <Button
                        variant="noShadow"
                        type="button"
                        className="flex gap-2 items-center border-2 py-3 px-4 rounded-base bg-white hover:bg-blue-300 "
                        onClick={() =>
                            appendChapter({
                                chapterTitle: "",
                                lessons: [{ lessonTitle: "", videoKey: "" }],
                            })
                        }
                    >
                        <PackagePlus className="size-5" />
                        Add chapter
                    </Button>

                    <Button
                        variant="noShadow"
                        type="submit"
                        className="py-3 px-10 border-2 rounded-base bg-green-300 hover:bg-green-400"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CourseStrucureOutlet;

// separating lesson from the form since,
// useFieldArray should be at the toplevel in a FC

type Props = {
    register: UseFormRegister<formValue>;
    control: Control<formValue>;
    errors: FieldErrors<formValue>;
    chapterIndex: number;
};

const LessonForm: React.FC<Props> = ({
    register,
    control,
    errors,
    chapterIndex,
}) => {
    const { id } = useParams();
    const { currentData: content } = useGetAllCourseVideosQuery({
        courseId: id,
    });

    const {
        fields: lessonFields,
        append: appendLesson,
        remove: removeLesson,
    } = useFieldArray({
        control,
        name: `chapters.${chapterIndex}.lessons`,
    });

    return (
        <div>
            {lessonFields.map((lesson, lessonIndex) => (
                <div
                    key={lesson.id}
                    className="rounded-base border-black p-5 bg-slate-100 mb-3 relative"
                >
                    {/* lesson Title */}
                    <div>
                        <label
                            htmlFor="category"
                            className="font-semibold flex justify-between gap-2 items-baseline"
                        >
                            {" "}
                            <div className="flex gap-2 items-baseline">
                                Lesson {lessonIndex + 1} Title
                                {errors?.chapters?.[chapterIndex]?.lessons?.[
                                    lessonIndex
                                ]?.lessonTitle?.message && (
                                    <span className="validation-error">
                                        (
                                        {String(
                                            errors?.chapters?.[chapterIndex]
                                                ?.lessons?.[lessonIndex]
                                                ?.lessonTitle.message
                                        )}
                                        )
                                    </span>
                                )}
                            </div>
                        </label>
                        <input
                            type="text"
                            {...register(
                                `chapters.${chapterIndex}.lessons.${lessonIndex}.lessonTitle`,
                                { required: "lesson title required" }
                            )}
                            className="input-neo w-full border-zinc-200"
                        />
                    </div>

                    {/* video selectiion */}
                    <div className="flex-1 mt-2">
                        <label
                            htmlFor="category"
                            className="font-semibold flex justify-between gap-2 items-baseline"
                        >
                            {" "}
                            <div className="flex gap-2 items-baseline">
                                Lesson Video
                                {errors?.chapters?.[chapterIndex]?.lessons?.[
                                    lessonIndex
                                ]?.videoKey?.message && (
                                    <span className="validation-error">
                                        (
                                        {String(
                                            errors?.chapters?.[chapterIndex]
                                                ?.lessons?.[lessonIndex]
                                                ?.videoKey?.message
                                        )}
                                        )
                                    </span>
                                )}
                            </div>
                        </label>

                        <div className="bg-white rounded-base p-2 border-2">
                            <select
                                {...register(
                                    `chapters.${chapterIndex}.lessons.${lessonIndex}.videoKey`,
                                    {
                                        required: {
                                            value: true,
                                            message: "select a video",
                                        },
                                    }
                                )}
                                className="w-full border-none outline-none"
                            >
                                <option value="" disabled>
                                    Select video for lesson
                                </option>
                                {content &&
                                    content.courseVideos.map(
                                        (video: Ivideo) => (
                                            <option
                                                key={video._id}
                                                value={video.key}
                                            >
                                                {video.displayName}
                                            </option>
                                        )
                                    )}
                            </select>
                        </div>
                    </div>
                    {lessonFields.length > 1 && (
                        <div className="absolute top-2 right-2">
                            <button
                                type="button"
                                onClick={() => removeLesson(lessonIndex)}
                                title="delete lessson"
                            >
                                <FileX2 className="text-zinc-400 hover:text-red-400 size-5" />
                            </button>
                        </div>
                    )}
                </div>
            ))}

            <button
                type="button"
                onClick={() => appendLesson({ lessonTitle: "", videoKey: "" })}
                className="flex gap-2 items-center border-2 py-1 px-3 rounded-base bg-slate-100 hover:bg-slate-300"
            >
                <FilePlus2 className="size-4" />
                Add lesson
            </button>
        </div>
    );
};
