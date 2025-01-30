import React, { SetStateAction, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import VideoPlayer from "../Learn/VideoPlayer";
import { X } from "lucide-react";
import { ILesson } from "../Learn/Types";

type Props = {
    url: string | undefined;
    showDemoVideo: boolean;
    setShowDemoVideo: React.Dispatch<SetStateAction<boolean>>;
};

const DemoVideoModal: React.FC<Props> = ({
    url,
    showDemoVideo,
    setShowDemoVideo,
}) => {
    const [lesson, setLesson] = useState<ILesson | undefined>(undefined);

    useEffect(() => {
        if (url) {
            const mockLesson: ILesson = {
                lessonTitle: "",
                videoKey: {
                    transcodedVideoMasterFileKey: url,
                    aiStatus: "processing",
                    key: "",
                    _id: "",
                },
                _id: "",
            };
            setLesson(mockLesson);
        }
    }, [url]);

    const handleCloseDemoVideo = () => {
        setShowDemoVideo(false);
        document.body.style.overflow = "auto";
    };

    const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLDivElement).id === "modal") handleCloseDemoVideo();
    };

    return (
        <div>
            {showDemoVideo &&
                createPortal(
                    <div
                        onClick={handleModalClick}
                        id="modal"
                        className="fixed inset-0 w-full h-full z-50 pt-64 lg:pt-28 bg-black/60"
                    >
                        <div className="relative w-10/12 xl:w-7/12 h-2/5 xl:h-4/5 mx-auto">
                            <VideoPlayer lesson={lesson} />
                            <button
                                onClick={handleCloseDemoVideo}
                                className="absolute -top-3 -right-3 p-1 rounded-base bg-zinc-700 border-black hover:bg-black"
                            >
                                <X className="stroke-red-400" />
                            </button>
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
};

export default DemoVideoModal;
