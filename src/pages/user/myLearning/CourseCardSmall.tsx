import React from "react";

type Props = {
    courseDetails: {
        thumbnail: {
            url: string;
        };
        _id: string;
        title: string;
        createdBy: {
            legalName: string;
        };
    };
};
const CourseCardSmall: React.FC<Props> = ({ courseDetails }) => {
    return (
        <div className="border-2 border-black w-[19rem] h-72 rounded-base overflow-hidden">
            <div className="w-full h-[10.685rem] border-b-2 border-black rounded-t-base overflow-hidden bg-slate-300">
                <img
                    src={courseDetails.thumbnail?.url}
                    className="w-full h-h-full object-cover"
                />
            </div>

            <div className="bg-white px-5 py-3 h-full">
                <h3 className="font-medium">{courseDetails.title}</h3>
                <p className="text-sm text-ellipsis">
                    {courseDetails.createdBy.legalName}
                </p>
            </div>
        </div>
    );
};

export default CourseCardSmall;
