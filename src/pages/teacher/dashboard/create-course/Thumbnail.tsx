import { Upload } from "lucide-react";
import React, { useRef } from "react";

const Thumbnail: React.FC<{ courseDetails: object }> = ({ courseDetails }) => {
    const fileButtonRef = useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
        fileButtonRef.current?.click();
    };

    const handleFileChnage = (e) => {
        const fileInput = fileButtonRef.current;
        if (fileInput?.files && fileInput.files?.length > 0) {
            const file = fileInput.files[0];
            console.log(file);
            const formData = new FormData();
            formData.append("newThumbnail", file);
            formData.append("courseId", courseDetails._id);
            if (courseDetails.thumbnail?.public_id) {
                formData.append(
                    "thumbnailPublic_id",
                    courseDetails.thumbnail.public_id
                );
            }


            console.log(formData);
        }
    };

    return (
        <div className="mx-auto w-[50rem] mt-10">
            <p className="font-semibold">Thumbnail</p>
            <div className="border-2 rounded-base border-black min-h-5 mt-1 py-5">
                <div
                    onClick={handleClick}
                    className="flex flex-col justify-center items-center py-5 w-44 mx-auto bg-blue-100 rounded-base border-2 border-dashed border-black cursor-pointer"
                >
                    <Upload />
                    <p>Upload Thumbnail</p>
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        ref={fileButtonRef}
                        onChange={handleFileChnage}
                    />
                </div>
            </div>
        </div>
    );
};

export default Thumbnail;
