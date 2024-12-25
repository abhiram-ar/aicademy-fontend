import React, { useState, useRef } from "react";

import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
    convertToPixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
    mediaWidth: number,
    mediaHeight: number,
    aspect: number
) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: "%",
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

export default function ImgCrop({ handleUpload }) {
    const [imgSrc, setImgSrc] = useState("");
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
    const blobUrlRef = useRef("");
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const [scale, setScale] = useState(1);
    const [rotate, setRotate] = useState(0);
    const [aspect, setAspect] = useState<number | undefined>(16 / 9);

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined); // Makes crop preview update between images.
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                setImgSrc(reader.result?.toString() || "")
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    }

    async function onDownloadCropClick() {
        const image = imgRef.current;
        const previewCanvas = previewCanvasRef.current;
        if (!image || !previewCanvas || !completedCrop) {
            throw new Error("Crop canvas does not exist");
        }

        // This will size relative to the uploaded image
        // size. If you want to size according to what they
        // are looking at on screen, remove scaleX + scaleY
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        const offscreen = new OffscreenCanvas(
            completedCrop.width * scaleX,
            completedCrop.height * scaleY
        );
        const ctx = offscreen.getContext("2d");
        if (!ctx) {
            throw new Error("No 2d context");
        }

        ctx.drawImage(
            previewCanvas,
            0,
            0,
            previewCanvas.width,
            previewCanvas.height,
            0,
            0,
            offscreen.width,
            offscreen.height
        );
        // You might want { type: "image/jpeg", quality: <0 to 1> } to
        // reduce image size
        const blob = await offscreen.convertToBlob({
            type: "image/png",
        });

        const newFile = new File([blob], "newfile.jpg", { type: "image/png" });

        console.log(`blog`, newFile);

        handleUpload(newFile);

        // if (blobUrlRef.current) {
        //     URL.revokeObjectURL(blobUrlRef.current);
        // }
        // blobUrlRef.current = URL.createObjectURL(blob);

        // if (hiddenAnchorRef.current) {
        //     hiddenAnchorRef.current.href = blobUrlRef.current;
        //     hiddenAnchorRef.current.click();
        // }
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate
                );
            }
        },
        100,
        [completedCrop, scale, rotate]
    );

    function handleToggleAspectClick() {
        if (aspect) {
            setAspect(undefined);
        } else {
            setAspect(16 / 9);

            if (imgRef.current) {
                const { width, height } = imgRef.current;
                const newCrop = centerAspectCrop(width, height, 16 / 9);
                setCrop(newCrop);
                // Updates the preview
                setCompletedCrop(convertToPixelCrop(newCrop, width, height));
            }
        }
    }

    return (
        <div className="h-2/3">
            <div className="Crop-Controls">
                <input type="file" accept="image/*" onChange={onSelectFile} />
                <div>
                    {/* 
          <label htmlFor="scale-input">Scale: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!imgSrc}
            onChange={(e) => setScale(Number(e.target.value))}
          /> */}
                </div>
                <div>
                    {/* <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          /> */}
                </div>
                <div>
                    {/* <button onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? 'off' : 'on'}
          </button> */}
                </div>
            </div>
            {!!imgSrc && (
                <ReactCrop
                    crop={crop}
                    onChange={(_, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspect}
                    // minWidth={400}
                    minHeight={100}
                    // circularCrop
                >
                    <img
                        ref={imgRef}
                        alt="Crop me"
                        src={imgSrc}
                        style={{
                            transform: `scale(${scale}) rotate(${rotate}deg)`,
                        }}
                        onLoad={onImageLoad}
                    />
                </ReactCrop>
            )}
            {!!completedCrop && (
                <>
                    <div>
                        <canvas
                            ref={previewCanvasRef}
                            style={{
                                border: "1px solid black",
                                objectFit: "contain",
                                width: completedCrop.width,
                                height: completedCrop.height,
                                display: "none",
                            }}
                        />
                    </div>
                    <div>
                        <button onClick={onDownloadCropClick}>
                            Download Crop
                        </button>

                        <a
                            href="#hidden"
                            ref={hiddenAnchorRef}
                            download
                            style={{
                                position: "absolute",
                                top: "-200vh",
                                visibility: "hidden",
                            }}
                        >
                            Hidden download
                        </a>
                    </div>
                </>
            )}
        </div>
    );
}
