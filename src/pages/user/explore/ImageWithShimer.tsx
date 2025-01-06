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
                className={`w-full h-full object-contain ${
                    thumbnailLoading ? " hidden " : "block"
                }`}
                onLoad={() => setThumbnailLoading(false)}
            />
        </>
    );
};

export default ImageWithShimer;
