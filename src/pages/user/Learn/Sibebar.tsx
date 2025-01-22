import React, { useState } from "react";
import CourseContents from "./CourseContents";
import Chat from "./Chat";
import { ICourseContent, ILesson } from "./Types";

type Props = {
    setCurrentlyPlaying: React.Dispatch<
        React.SetStateAction<ILesson | undefined>
    >;
    content?: ICourseContent;
};

const Sibebar: React.FC<Props> = ({ content, setCurrentlyPlaying }) => {
    const [openChat, setOpenChat] = useState(false);
    return (
        <>
            <div className="grid grid-cols-2 border-b-2 border-black justify-center items-center text-center font-publicSans font-semibold text-xl text-white">
                {/* contents */}
                <button
                    onClick={() => setOpenChat(false)}
                    className={`p-5 transition-colors duration-100 hover:bg-[#374151] border-e-2 border-black ${
                        !openChat ? "bg-[#374151]" : "bg-[#242a35]"
                    }`}
                >
                    Contents
                </button>

                {/* clear.ai */}
                <button
                    onClick={() => setOpenChat(true)}
                    className={`p-5 transition-colors duration-200 hover:bg-[#a388ee] ${
                        openChat ? "bg-[#a388ee]" : "bg-[#272733]"
                    }`}
                >
                    clear.ai
                </button>
            </div>

            <div className="bg-[#fef2e8] max-h-[79.5vh] min-h-[79.5vh] relative ">
                {openChat ? (
                    <Chat />
                ) : (
                    <CourseContents
                        chapters={content?.chapters}
                        setCurrentlyPlaying={setCurrentlyPlaying}
                    />
                )}
            </div>
        </>
    );
};

export default Sibebar;
