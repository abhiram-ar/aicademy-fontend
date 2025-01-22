import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/file";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
    Fullscreen,
    Pause,
    Play,
    Settings,
    Volume2,
    VolumeOff,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Progress = {
    playedSeconds: number;
    played: number;
    loadedSeconds: number;
    loaded: number;
};

const VideoPlayer: React.FC<{ url: string }> = ({
    url = "https://d3petuww6xgji.cloudfront.net/transcoded/678f4b56093fe2e9714bb0cc/master.m3u8",
}) => {
    const playerRef = useRef<ReactPlayer | null>(null);
    const playerWrapperRef = useRef<HTMLDivElement | null>(null);
    const controlsRef = useRef<HTMLDivElement | null>(null);
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

        played: 0,
        loaded: 0,
        duration: 0,
    });

    useEffect(() => {
        let timer: NodeJS.Timeout | undefined;
        const controls = controlsRef.current;
        const playerWrapper = playerWrapperRef.current;
        let handleShowContorl: () => void;

        if (controls && playerWrapper) {
            handleShowContorl = () => {
                clearInterval(timer);
                controls.style.opacity = "100";
                timer = setTimeout(() => {
                    controls.style.opacity = "0";
                }, 3000);
            };
            playerWrapper.addEventListener("mousemove", handleShowContorl);
        }
        return () => {
            if (playerWrapper)
                playerWrapper.removeEventListener(
                    "mousemove",
                    handleShowContorl
                );
        };
    }, []);

    const handleReady = () => {
        if (playerRef.current) {
            const internalPlayer = playerRef.current.getInternalPlayer("hls");

            if (internalPlayer && internalPlayer.levels) {
                const availableQualities = internalPlayer.levels
                    .filter(
                        (level: { height: string }) => level.height //fitler only video streams
                    )
                    .map((level: { height: number }) => ({
                        value: level.height,
                        label: `${level.height}p`,
                    }));
                // console.log(availableQualities);

                availableQualities.sort(
                    (qA: { value: number }, qB: { value: number }) =>
                        qB.value - qA.value
                );

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

    const togglefullScreen = () => {
        if (playerWrapperRef.current) {
            if (!document.fullscreenElement) {
                playerWrapperRef.current.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }
    };

    const handleDuration = (duration: number) => {
        console.log(duration);
        setPlayerState((prev) => ({ ...prev, duration }));
    };

    const handleProgress = (progress: Progress) => {
        setPlayerState((prev) => ({
            ...prev,
            played: progress.playedSeconds,
            loaded: progress.loadedSeconds,
        }));
    };

    const handleSeekChange = (e: number[]) => {
        setPlayerState((prev) => ({
            ...prev,
            played: e[0],
        }));
        const player = playerRef.current;
        if (player) {
            player.seekTo(e[0]);
        }
    };

    return (
        <div ref={playerWrapperRef} className="w-full h-full bg-black relative">
            <ReactPlayer
                ref={playerRef}
                url={url}
                controls={false}
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
                onDuration={handleDuration}
                onProgress={handleProgress}
            />
            <div
                ref={controlsRef}
                className="bg-black/70 absolute bottom-0 inset-x-0 px-5 pb-3 text-white fill-white backdrop-blur-md transition-opacity duration-300"
            >
                {/*seeker  */}
                <div>
                    <Slider
                        defaultValue={[0]}
                        max={playerState.duration}
                        step={1}
                        value={[playerState.played]}
                        onValueChange={handleSeekChange}
                        className="mb-3 cursor-pointer"
                    />
                </div>

                {/* controlss */}
                <div className="flex justify-between">
                    {/* playpause */}
                    <div className="flex gap-5">
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

                        {/* duration and played */}
                        <div className="text-sm ">
                            {playerState.duration && playerState.played
                                ? `${Math.floor(
                                      playerState.played / 60
                                  )}:${Math.ceil(
                                      playerState.played % 60
                                  )} / ${Math.floor(
                                      playerState.duration / 60
                                  )}:${Math.ceil(playerState.duration % 60)}`
                                : ""}
                        </div>
                    </div>

                    <div className="flex gap-5">
                        <div className="flex gap-2">
                            {playerState.muted ? (
                                <VolumeOff
                                    className="cursor-pointer"
                                    onClick={() => handleVolumeChange(0.7)}
                                />
                            ) : (
                                <Volume2
                                    className="cursor-pointer"
                                    onClick={() => handleVolumeChange(0)}
                                />
                            )}
                            <input
                                type="range"
                                className="opacity-70 hover:opacity-100 accent-zinc-400"
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
                            <DropdownMenuTrigger className="cursor-pointer">
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
                        <div>
                            <Fullscreen
                                className="cursor-pointer"
                                onClick={togglefullScreen}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;
