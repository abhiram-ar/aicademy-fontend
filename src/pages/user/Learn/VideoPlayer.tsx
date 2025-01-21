import { Pause, Play, Settings, Volume2, VolumeOff } from "lucide-react";
import React, { useRef, useState } from "react";
import ReactPlayer from "react-player/file";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const VideoPlayer = ({
    url = "https://d3petuww6xgji.cloudfront.net/transcoded/678f4b56093fe2e9714bb0cc/master.m3u8",
}) => {
    const playerRef = useRef<ReactPlayer | null>(null);
    const [selectedLevel, setSelectedLevel] = useState<number>(-1); //-1 auto
    const [qualityLevels, setQualityLevels] = useState([
        {
            value: -1,
            label: "auto",
        },
    ]);
    const [playerState, setPlayerState] = useState({
        playing: true,
        muted: false,
        volume: 0.7,
    });

    const handleReady = () => {
        if (playerRef.current) {
            const internalPlayer = playerRef.current.getInternalPlayer("hls");
            console.log(internalPlayer);
            if (internalPlayer && internalPlayer.levels) {
                const availableQualities = internalPlayer.levels
                    .filter(
                        (level: { height: string }) => level.height //fitler only video streams
                    )
                    .map((level) => ({
                        value: level.height,
                        label: `${level.height}p`,
                    }));
                console.log(availableQualities);

                availableQualities.sort((qA, qB) => qB.value - qA.value);

                setQualityLevels([
                    ...availableQualities,
                    {
                        value: -1,
                        label: "auto",
                    },
                ]);
            }
        }
    };
    console.log(qualityLevels);

    const handleQualityChange = (value: number) => {
        setSelectedLevel(value);

        const internalPlayer = playerRef.current?.getInternalPlayer("hls");
        if (internalPlayer) {
            if (value === -1) return (internalPlayer.currentLevel = -1); //auto mode

            internalPlayer.levels.forEach(
                (level: { height: number }, index: number) => {
                    if (level.height === value) {
                        internalPlayer.currentLevel = index;
                        console.log("res match and update");
                    }
                }
            );
        }
    };

    const handlePlaying = (newState: boolean) => {
        setPlayerState((prev) => ({ ...prev, playing: newState }));
    };

    const handleVolumeChange = (value: number) => {
        setPlayerState((prev) => ({ ...prev, volume: value }));
        if (value === 0) setPlayerState((prev) => ({ ...prev, muted: true }));
        else setPlayerState((prev) => ({ ...prev, muted: false }));
    };

    return (
        <div className="w-full h-full bg-black relative">
            <ReactPlayer
                ref={playerRef}
                url={url}
                controls={true}
                width={"100%"}
                height={"100%"}
                playIcon={<Play className="stroke-white size-16" />}
                light={true}
                pip={true}
                onReady={handleReady}
                volume={playerState.volume}
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

                    <div className="flex gap-5">
                        <div className="flex gap-2">
                            {playerState.muted ? (
                                <VolumeOff
                                    onClick={() => handleVolumeChange(0.7)}
                                />
                            ) : (
                                <Volume2
                                    onClick={() => handleVolumeChange(0)}
                                />
                            )}
                            <input
                                type="range"
                                className="opacity-50 hover:opacity-100 range-"
                                min={0}
                                max={1}
                                step={0.01}
                                value={playerState.volume}
                                onChange={(e) =>
                                    handleVolumeChange(
                                        parseFloat(e.target.value)
                                    )
                                }
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Settings />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-white">
                                <DropdownMenuLabel>Quality</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {qualityLevels.map((quality, index) => (
                                    <DropdownMenuItem
                                        key={index}
                                        disabled={
                                            quality.value === selectedLevel
                                        }
                                        onClick={() =>
                                            handleQualityChange(quality.value)
                                        }
                                        className={`bg-white hover:bg-slate-300 border-0 hover:border-0 ${
                                            quality.value === selectedLevel &&
                                            "bg-zinc-400"
                                        }`}
                                    >
                                        {quality.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
