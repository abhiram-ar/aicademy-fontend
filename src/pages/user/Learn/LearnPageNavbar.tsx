import React from "react";
import { Link } from "react-router-dom";

const LearnPageNavbar: React.FC<{ title?: string }> = ({ title }) => {
    return (
        <div
            className={`w-full h-24 bg-[#212121] px-10 shadow-[0_4px] flex  items-center gap-5 relative z-20`}
        >
            <h1 className="text-3xl font-bold text-[#eeefe9]">
                <Link to="/">AIcademy</Link>
            </h1>
            <p className="text-[#eeefe9] font-semibold text-4xl">|</p>
            <p className="text-[#eeefe9] font-semibold text-3xl">{title}</p>
        </div>
    );
};

export default LearnPageNavbar;
