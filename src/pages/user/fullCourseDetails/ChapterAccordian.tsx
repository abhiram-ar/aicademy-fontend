import React from "react";
import { Video } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {
    chapters: IChapter[];
};

const ChapterAccordion: React.FC<Props> = ({ chapters }) => {
    return (
        <Accordion className="" type="multiple">
            {chapters.map((chapter, index) => (
                <AccordionItem
                    key={index}
                    className="shadow-none border-2 mt-2"
                    value={`item-${index + 1}`}
                >
                    <AccordionTrigger className="bg-zinc-300 font-semibold">
                        {chapter.chapterTitle}
                    </AccordionTrigger>
                    <AccordionContent>
                        <p className="">
                            {chapter.lessons.map((lesson, index) => (
                                <p
                                    key={index}
                                    className="flex gap-2 items-center mb-2"
                                >
                                    <Video className="size-4" />

                                    {lesson.lessonTitle}
                                </p>
                            ))}
                        </p>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default ChapterAccordion;
