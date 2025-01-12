import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const ReadyToLearn = () => {
    return (
        <div className="w-full bg-[#a388ee] h-96 border-y-4 border-black flex justify-center items-center">
            <div>
                <h2 className="font-RedHat text-[3rem] font-extrabold mb-5">
                    Ready To Learn?
                </h2>

                <Link to="/explore">
                    <Button
                        className="w-fit block mx-auto h-14 text-xl"
                        size="lg"
                    >
                        Explore Courses
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ReadyToLearn;
