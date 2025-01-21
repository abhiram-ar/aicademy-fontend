import { Pause, Play, Volume2, VolumeOff } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/file";

const VideoPlayer = () => {
    const playerRef = useRef<ReactPlayer | null>(null);
    const [playerState, setPlayerState] = useState({
        playing: true,
        muted: false,
    });

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.setState({ playing: true });
        }
    }, []);

    const handlePlaying = (newState: boolean) => {
        setPlayerState((prev) => ({ ...prev, playing: newState }));
    };

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
                playIcon={<Play className="stroke-white size-16" />}
                light={true}
                pip={true}
                muted={playerState.muted}
                playing={playerState.playing}
                onPause={() => handlePlaying(false)}
                onPlay={() => handlePlaying(true)}
            />
            <div className="bg-white/80 absolute bottom-1 inset-x-0 p-3">
                {/*seeker  */}
                <div></div>

                {/* controlss */}
                <div className="flex justify-between">
                    {/* playpause */}
                    <div>
                        {playerState.playing ? (
                            <Pause
                                className="cursor-pointer"
                                onClick={() => handlePlaying(false)}
                            />
                        ) : (
                            <Play
                                className="cursor-pointer"
                                onClick={() => handlePlaying(true)}
                            />
                        )}
                    </div>

                    <div>
                        <div>
                            {playerState.muted ? <VolumeOff /> : <Volume2 />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
