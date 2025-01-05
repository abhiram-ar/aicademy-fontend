import React from "react";

const CourseCardSmall = () => {
    return (
        <div className="border-2 border-black w-[19rem] h-72 rounded-base overflow-hidden">
            <div className="w-full h-[10.685rem] border-b-2 border-black rounded-t-base overflow-hidden bg-slate-300">
                <img
                    src="https://cdn.pixabay.com/photo/2022/05/18/23/07/fractal-art-7206297_1280.jpg"
                    className="w-full h-h-full object-cover"
                />
            </div>

            <div className="bg-white px-5 py-3 h-full">
                <h3 className="font-medium">
                    ChatGPT Complete Guide: Learn Generative Al, ChatGPT & More
                </h3>
                <p className="text-sm text-ellipsis">Abhiram S Sajeev</p>
            </div>
        </div>
    );
};

export default CourseCardSmall;
