import React from "react";
import { Video } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { IChapter, ILesson } from "./Types";

type Props = {
    currentlyPlaying: ILesson | undefined;
    setCurrentlyPlaying: React.Dispatch<
        React.SetStateAction<ILesson | undefined>
    >;
    chapters?: IChapter[];
};

const CourseContents: React.FC<Props> = ({
    chapters,
    setCurrentlyPlaying,
    currentlyPlaying,
}) => {
    return (
        <Accordion className="p-2" type="multiple">
            {chapters &&
                chapters.map((chapter) => (
                    <AccordionItem
                        key={chapter._id}
                        className="shadow-none border-2 mt-2"
                        value={`item-${chapter._id}`}
                    >
                        <AccordionTrigger className="bg-zinc-300 font-semibold">
                            {chapter.chapterTitle}
                        </AccordionTrigger>
                        <AccordionContent className="p-0">
                            <div className="">
                                {chapter.lessons.map((lesson) => (
                                    <p
                                        key={lesson._id}
                                        className={`flex gap-2 items-center border p-2.5  hover:underline hover:bg-slate-200 cursor-pointer  ${
                                            currentlyPlaying &&
                                            currentlyPlaying._id ===
                                                lesson._id &&
                                            "bg-amber-300 hover:bg-amber-300"
                                        }`}
                                        onClick={() =>
                                            setCurrentlyPlaying(lesson)
                                        }
                                    >
                                        <Video
                                            className={`size-4 ${
                                                currentlyPlaying &&
                                                currentlyPlaying._id ===
                                                    lesson._id &&
                                                "fill-slate-600"
                                            }`}
                                        />

                                        {lesson.lessonTitle}
                                    </p>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
        </Accordion>
    );
};

export default CourseContents;
