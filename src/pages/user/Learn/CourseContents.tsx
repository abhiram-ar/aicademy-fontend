import React from "react";
import { Video } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const chapters = [
    {
        chapterTitle: "Introduction to Programming",
        lessons: [
            {
                lessonTitle: "What is Programming?",
                videoKey: "intro_01",
                videoURL: "https://example.com/videos/intro_01.mp4",
                videoDuration: 300, // 5 minutes in seconds
            },
            {
                lessonTitle: "Setting Up Your Environment",
                videoKey: "intro_02",
                videoURL: "https://example.com/videos/intro_02.mp4",
                videoDuration: 420, // 7 minutes in seconds
            },
        ],
    },
    {
        chapterTitle: "JavaScript Basics",
        lessons: [
            {
                lessonTitle: "Variables and Data Types",
                videoKey: "js_01",
                videoURL: "https://example.com/videos/js_01.mp4",
                videoDuration: 480, // 8 minutes in seconds
            },
            {
                lessonTitle: "Functions and Scope",
                videoKey: "js_02",
                videoURL: "https://example.com/videos/js_02.mp4",
                videoDuration: 600, // 10 minutes in seconds
            },
        ],
    },
    {
        chapterTitle: "Advanced JavaScript",
        lessons: [
            {
                lessonTitle: "Asynchronous Programming",
                videoKey: "adv_js_01",
                videoURL: "https://example.com/videos/adv_js_01.mp4",
                videoDuration: 540, // 9 minutes in seconds
            },
            {
                lessonTitle: "Error Handling",
                videoKey: "adv_js_02",
                videoURL: "https://example.com/videos/adv_js_02.mp4",
                videoDuration: 480, // 8 minutes in seconds
            },
        ],
    },
    {
        chapterTitle: "Conclusion",
        lessons: [
            {
                lessonTitle: "Course Summary and Next Steps",
                videoKey: "conclusion_01",
                videoURL: "https://example.com/videos/conclusion_01.mp4",
                videoDuration: 300, // 5 minutes in seconds
            },
        ],
    },
];

const CourseContents = () => {
    return (
        <Accordion className="p-2" type="multiple">
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
                        <div className="">
                            {chapter.lessons.map((lesson, index) => (
                                <p
                                    key={index}
                                    className={`flex gap-2 items-center py-2  hover:underline cursor-pointer ${
                                        index !== chapter.lessons.length - 1 &&
                                        "border-b"
                                    }`}
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
