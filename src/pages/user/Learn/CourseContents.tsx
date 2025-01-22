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
    setCurrentlyPlaying: React.Dispatch<
        React.SetStateAction<ILesson | undefined>
    >;
    chapters?: IChapter[];
};

const CourseContents: React.FC<Props> = ({ chapters, setCurrentlyPlaying }) => {
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
                        <AccordionContent>
                            <div className="">
                                {chapter.lessons.map((lesson) => (
                                    <p
                                        key={lesson._id}
                                        className={`flex gap-2 items-center py-2  hover:underline cursor-pointer`}
                                        onClick={() =>
                                            setCurrentlyPlaying(lesson)
                                        }
                                    >
                                        <Video className="size-4" />

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
