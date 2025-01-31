import { RootState } from "@/redux/store";
import axios from "axios";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSaveUploadedVideoMetadaMutation } from "@/redux/features/teacher/courseCreationAPIs";
import { Progress } from "@/components/ui/progress";
import { Upload as UploadIcon, X } from "lucide-react";
import toast from "react-hot-toast";

const Upload = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const abortController = useRef<AbortController | null>(null);
    const [saveMetadata] = useSaveUploadedVideoMetadaMutation();
    const { id } = useParams();
    const uploadRef = useRef<HTMLInputElement | null>(null);

    const handleUpload = async (file: File) => {
        if (file.type.split("/")[0] !== "video") {
            console.log("invalid file");
            toast.error("Please upload only video");
            return;
        }
        try {
            setIsUploading(true);
            setUploadProgress(0);

            const { data } = await axios.post(
                `${
                    import.meta.env.VITE_BACKEND_BASE_URL
                }/api/course/upload/presignedurl`,
                {
                    fileName: file.name,
                    fileType: file.type,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // upload file to S3
            abortController.current = new AbortController();
            await axios.put(data.preSignedURL, file, {
                headers: { "Content-Type": file.type },
                onUploadProgress: (event) => {
                    if (!event.total) return;
                    const percentComplete = Math.round(
                        (event.loaded * 100) / event.total
                    );
                    setUploadProgress(percentComplete);
                },
                signal: abortController.current.signal,
            });

            // save file metadata to DB
            await saveMetadata({
                courseId: id,
                key: data.key,
                originalFileName: file.name,
                originalFileSize: file.size,
                originalFileType: file.type,
            }).unwrap();
            console.log(`video metadata added to DB`);
            toast.success("video uploaded successfully");
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log(`upload cancelled`);
                //todo: toast
            } else {
                console.error(`error while uploading`, error);
            }
        } finally {
            console.log(`finally`);
            setUploadProgress(0);
            setIsUploading(false);
            abortController.current = null;
            if (uploadRef.current) {
                uploadRef.current.value = "";
            }
            //set about controller null
        }
    };

    const handleUploadCancel = () => {
        if (abortController.current) {
            abortController.current.abort();
        }
    };

    const hanleUploadClick = () => {
        uploadRef.current?.click();
    };

    return (
        <div className="w-[50rem] border-2 border-black mx-auto mt-10 p-3 bg-slate-100 grid grid-cols-7 items-center gap-5 rounded-t-base border-b-0">
            <input
                type="file"
                ref={uploadRef}
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                    console.log(e.target.files);
                    if (e.target.files && e.target?.files?.length > 0) {
                        console.log(e.target.files[0]);
                        handleUpload(e.target.files[0]);
                    }
                }}
            />
            <div className="col-span-6">
                {isUploading && (
                    <div className="flex justify-center items-baseline gap-3">
                        <p>Uploading</p>
                        <Progress value={uploadProgress} />
                    </div>
                )}
            </div>
            {!isUploading ? (
                <button
                    onClick={hanleUploadClick}
                    className="bg-blue-200 border-2 hover:bg-blue-300 py-1  px-3 rounded-base w-fit h-fit place-self-center flex justify-center items-center gap-2"
                >
                    <UploadIcon className="size-4" />
                    Upload
                </button>
            ) : (
                <button
                    onClick={handleUploadCancel}
                    className="bg-red-400 border-2 hover:bg-red-500 py-1  px-3 rounded-base w-fit h-fit place-self-center flex justify-center items-center gap-2"
                >
                    <X className="size-4" />
                    Cancel
                </button>
            )}
        </div>
    );
};

export default Upload;
