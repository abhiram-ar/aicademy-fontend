import { RootState } from "@/redux/store";
import axios from "axios";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
    useGetAllCourseVideosQuery,
    useSaveUploadedVideoMetadaMutation,
} from "@/redux/features/teacher/courseCreationAPIs";
import { useParams } from "react-router-dom";

const CourseAssetsOutlet = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const abortController = useRef<AbortController | null>(null);
    const [saveMetadata] = useSaveUploadedVideoMetadaMutation();
    const { id } = useParams();
    const { data } = useGetAllCourseVideosQuery({ courseId: id });

    const handleUpload = async (file: File) => {
        try {
            setIsUploading(true);
            setUploadProgress(0);

            const { data } = await axios.post(
                "http://localhost:3000/api/course/upload/presignedurl",
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
                key: data.preSignedURL,
                originalFileName: file.name,
                originalFileSize: file.size,
                originalFileType: file.type,
            }).unwrap();
            console.log(`video metadata added to DB`);
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
            //set about controller null
        }
    };

    const handleUploadCancel = () => {
        if (abortController.current) {
            abortController.current.abort();
        }
    };

    console.log(data);

    return (
        <div>
            <input
                type="file"
                onChange={(e) => {
                    console.log(e.target.files);
                    if (e.target.files && e.target?.files?.length > 0) {
                        console.log(e.target.files[0]);
                        handleUpload(e.target.files[0]);
                    }
                }}
            />
            {isUploading && (
                <>
                    <p>{uploadProgress}% uploaded</p>
                    <button onClick={handleUploadCancel}>cancel</button>
                </>
            )}
        </div>
    );
};

export default CourseAssetsOutlet;
