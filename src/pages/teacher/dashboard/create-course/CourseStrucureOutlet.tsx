import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React from "react";
import {
    useForm,
    useFieldArray,
    Control,
    UseFormRegister,
    FieldErrors,
} from "react-hook-form";

type formValue = {
    chapters: {
        chapterTitle: string;
        lessons: {
            lessonTitle: string;
            videoKey: string;
        }[];
    }[];
};

// repcce with apis
const mockVideoKeys = ["video1.mp4", "video2.mp4", "video3.mp4"];

const CourseStrucureOutlet = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {
            chapters: [
                {
                    chapterTitle: "",
                    lessons: [{ lessonTitle: "", videoKey: "" }],
                },
            ],
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
    console.log(errors);

    return (
        <div>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
                {chapterFields.map((chapter, chapterIndex) => (
                    // chapter section
                    <div key={chapter.id}>
                        <h1>Chapter {chapterIndex + 1}</h1>

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
                                                    ?.message
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
                                className="input-neo border"
                            />
                        </div>
                        {chapterFields.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeChapter(chapterIndex)}
                            >
                                Remove chapter
                            </button>
                        )}

                        <h3>lessons</h3>
                        <div>
                            {/* lesson component */}
                            <LessonForm
                                register={register}
                                errors={errors}
                                control={control}
                                chapterIndex={chapterIndex}
                            />
                        </div>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() =>
                        appendChapter({
                            chapterTitle: "",
                            lessons: [{ lessonTitle: "", videoKey: "" }],
                        })
                    }
                >
                    Add chapter
                </button>
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
                <div key={lesson.id}>
                    {/* lesson Title */}
                    <div>
                        <label
                            htmlFor="category"
                            className="font-semibold flex justify-between gap-2 items-baseline"
                        >
                            {" "}
                            <div className="flex gap-2 items-baseline">
                                Lesson Title
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
                                `chapters.${chapterIndex}.lessons.${lessonIndex}.lessonTitle`
                            )}
                        />
                    </div>

                    {/* video selectiion */}
                    <div className="flex-1">
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
                        <Select
                            onValueChange={(value) => {
                                register(
                                    `chapters.${chapterIndex}.lessons.${lessonIndex}.videoKey`
                                ).onChange({
                                    target: { value },
                                });
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select video" />
                            </SelectTrigger>
                            <SelectContent>
                                {mockVideoKeys.map((key) => (
                                    <SelectItem key={key} value={key}>
                                        {key}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.chapters?.[chapterIndex]?.lessons?.[lessonIndex]
                            ?.videoKey && (
                            <p className="text-sm text-red-500 mt-1">
                                {
                                    errors.chapters[chapterIndex].lessons[
                                        lessonIndex
                                    ].videoKey.message
                                }
                            </p>
                        )}
                    </div>
                    {lessonFields.length > 1 && (
                        <div>
                            <button
                                type="button"
                                onClick={() => removeLesson(lessonIndex)}
                            >
                                Remove
                            </button>
                        </div>
                    )}
                </div>
            ))}

            <button
                type="button"
                onClick={() => appendLesson({ lessonTitle: "", videoKey: "" })}
            >
                Add lesson
            </button>
        </div>
    );
};
