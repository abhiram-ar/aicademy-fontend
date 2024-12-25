import { useUpdateThumnailMutation } from "@/redux/features/teacher/courseCreationAPIs";
import { Pencil, Upload } from "lucide-react";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import { ICourse } from "./CourseDraft";
import ImgCrop from "./Crop";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const Thumbnail: React.FC<{ courseDetails: ICourse }> = ({ courseDetails }) => {
    const fileButtonRef = useRef<HTMLInputElement | null>(null);
    const [updateThumbnail] = useUpdateThumnailMutation();
    const modalTriggerRef = useRef<HTMLButtonElement | null>(null);
    const modalSubmitRef = useRef<HTMLButtonElement | null>(null);

    const handleClick = () => {
        if (modalTriggerRef.current) modalTriggerRef.current.click();
        // fileButtonRef.current?.click();
    };

    const handleFileChnage = async () => {
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

            try {
                const request = updateThumbnail(formData).unwrap();
                toast.promise(request, {
                    loading: "updating thumbnail",
                    success: "Thumbnail successfully updated",
                    error: "Error While updating thumbnail",
                });
                await request;
            } catch (error) {
                console.error("error while upadating thumbnali", error);
            }
        }
    };

    const handleCroppedUpload = async (file: File) => {
        console.log(`file`, file);
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

        try {
            const request = updateThumbnail(formData).unwrap();
            if (modalSubmitRef.current) modalSubmitRef.current.click();
            toast.promise(request, {
                loading: "updating thumbnail",
                success: "Thumbnail successfully updated",
                error: "Error While updating thumbnail",
            });
            await request;
        } catch (error) {
            console.error("error while upadating thumbnali", error);
            toast("Error while updating thumbnail");
        }
    };

    return (
        <div className="mx-auto w-[50rem]  mt-10 ">
            <Dialog>
                <DialogTrigger asChild>
                    <button ref={modalTriggerRef} className="hidden">
                        Edit Profile
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update Thumbnail</DialogTitle>
                        <DialogDescription>
                            Image should have 16: 9 aspect ratio
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <ImgCrop handleUpload={handleCroppedUpload} />
                    </div>
                    <DialogClose asChild>
                        <button
                            type="button"
                            ref={modalSubmitRef}
                            className="hidden"
                        >
                            Close
                        </button>
                    </DialogClose>
                </DialogContent>
            </Dialog>

            <p className="font-semibold">Thumbnail</p>
            <div className="border-2 rounded-base border-black min-h-5 mt-1 relative bg-white">
                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={fileButtonRef}
                    onChange={handleFileChnage}
                />

                {courseDetails.thumbnail && courseDetails.thumbnail?.url ? (
                    <div className="min-h-5 w-full">
                        <img
                            src={courseDetails.thumbnail.url}
                            className="w-full h-full object-cover"
                        />
                        <div
                            onClick={handleClick}
                            className="absolute top-2 right-2 bg-zinc-500  p-3 rounded-full border border-black hover:bg-zinc-600"
                        >
                            <Pencil />
                        </div>
                    </div>
                ) : (
                    <div
                        onClick={handleClick}
                        className="flex flex-col justify-center items-center my-5 py-5 w-44 mx-auto bg-blue-100 rounded-base border-2 border-dashed border-black cursor-pointer min-h-5"
                    >
                        <Upload />
                        <p>Upload Thumbnail</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Thumbnail;
