import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

const CourseAssetsOutlet = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleUpload = async (file: File) => {
        try {
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
            console.log(data);
            const res = await axios.put(data.preSignedURL, file, {
                headers: { "Content-Type": file.type },
            });

            console.log(res);
        } catch (error) {
            console.error(`error while uploading`, error);
        }
    };
    return (
        <div>
            <input
                type="file"
                onChange={(e) => {
                    console.log(e.target.files);
                    if (e.target.files && e.target?.files?.length > 0) {
                        handleUpload(e.target.files[0]);
                    }
                }}
            />
        </div>
    );
};

export default CourseAssetsOutlet;
