import React, { SetStateAction } from "react";
import { createPortal } from "react-dom";
import VideoPlayer from "../Learn/VideoPlayer";
import { X } from "lucide-react";

type Props = {
    showDemoVideo: boolean;
    setShowDemoVideo: React.Dispatch<SetStateAction<boolean>>;
};

const DemoVideoModal: React.FC<Props> = ({
    showDemoVideo,
    setShowDemoVideo,
}) => {
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
                        className="absolute inset-0 w-full h-full z-50 pt-14 bg-black/60"
                    >
                        <div className="relative w-[80rem] h-[45rem] mx-auto">
                            <VideoPlayer />
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
