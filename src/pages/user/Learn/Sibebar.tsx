import React, { useState } from "react";
import CourseContents from "./CourseContents";

const Sibebar = () => {
    const [openChat, setOpenChat] = useState(false);
    return (
        <>
            <div className="grid grid-cols-2 border-b-2 border-black justify-center items-center text-center font-publicSans font-semibold text-xl text-white">
                <button
                    onClick={() => setOpenChat(false)}
                    className={`p-5 hover:bg-[#374151] border-e-2 border-black ${
                        !openChat ? "bg-[#374151]" : "bg-[#242a35]"
                    }`}
                >
                    Contents
                </button>
                <button
                    onClick={() => setOpenChat(true)}
                    className={`p-5  hover:bg-[#a388ee] ${
                        openChat ? "bg-[#a388ee]" : "bg-[#272733]"
                    }`}
                >
                    clear.ai
                </button>
            </div>

            <div className="p-2 bg-[#fef2e8] min-h-[79.5vh]">
                {openChat ? <></> : <CourseContents />}
            </div>
        </>
    );
};

export default Sibebar;
