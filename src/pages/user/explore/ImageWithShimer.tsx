import { useState } from "react";

const ImageWithShimer = ({ src }: { src: string }) => {
    const [thumbnailLoading, setThumbnailLoading] = useState(true);
    return (
        <>
            <div
                className={`${
                    thumbnailLoading ? " block " : " hidden "
                } w-full h-full bg-zinc-300 animate-pulse`}
            ></div>
            <img
                src={src}
                alt=""
                className={`bg-black w-full h-full object-contain transition-opacity duration-500 ${
                    thumbnailLoading ? " opacity-0 " : "opacity-100"
                }`}
                onLoad={() => setThumbnailLoading(false)}
            />
        </>
    );
};

export default ImageWithShimer;
