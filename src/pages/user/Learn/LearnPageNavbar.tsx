import React from "react";
import { Link } from "react-router-dom";

const LearnPageNavbar: React.FC<{ title?: string }> = ({ title }) => {
    return (
        <div
            className={`w-full h-24 bg-[#212121] px-5 md:px-10 shadow-[0_4px] flex  items-center gap-3 md:gap-5 relative z-20`}
        >
            <h1 className="text-2xl md:text-3xl font-bold text-[#eeefe9]">
                <Link to="/">AIcademy</Link>
            </h1>
            <p className="text-[#eeefe9] font-semibold text-2xl md:text-4xl">|</p>
            <p className="text-[#eeefe9] font-semibold  md:text-3xl">{title}</p>
        </div>
    );
};

export default LearnPageNavbar;
