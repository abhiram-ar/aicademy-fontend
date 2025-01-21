import { Pause, Play } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/file";

const VideoPlayer = () => {
    const playerRef = useRef<ReactPlayer | null>(null);
    const [playerState, setPlayerState] = useState({
        playing: true,
    });

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.setState({ playing: true });
        }
    }, []);

    return (
        <div className="w-full h-full bg-black relative">
            <ReactPlayer
                ref={playerRef}
                controls={true}
                url={
                    "https://d3petuww6xgji.cloudfront.net/transcoded/678f4b56093fe2e9714bb0cc/master.m3u8"
                }
                width={"100%"}
                height={"100%"}
                light={true}
                pip={true}
                playIcon={<Play className="stroke-white size-16" />}
                playing={playerState.playing}
                onPause={() =>
                    setPlayerState((prev) => ({ ...prev, playing: false }))
                }
                onPlay={() =>
                    setPlayerState((prev) => ({ ...prev, playing: true }))
                }
            />
            <div className="bg-white/80 absolute bottom-1 inset-x-0 p-3">
                {/*seeker  */}
                <div></div>

                {/* controlss */}
                <div>
                    {playerState.playing ? (
                        <Pause
                            className="cursor-pointer"
                            onClick={() =>
                                setPlayerState((prev) => ({
                                    ...prev,
                                    playing: false,
                                }))
                            }
                        />
                    ) : (
                        <Play
                            className="cursor-pointer"
                            onClick={() =>
                                setPlayerState((prev) => ({
                                    ...prev,
                                    playing: true,
                                }))
                            }
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
