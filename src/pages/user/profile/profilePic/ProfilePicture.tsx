import { Pencil, Upload } from "lucide-react";
import React, { useRef } from "react";
import toast from "react-hot-toast";

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
import { useUpdateUserProfilePictureMutation } from "../profileApiSlice";

export interface IUserProfileDetails {
    userDetails: {
        firstName: string;
        lastName: string;
        _id: string;
        profilePicture?: {
            s3Key?: string;
            url?: string;
            public_id: string;
        };
    };
}

const ProfilePicture: React.FC<IUserProfileDetails> = ({ userDetails }) => {
    const [updateProfilePic] = useUpdateUserProfilePictureMutation();
    const modalTriggerRef = useRef<HTMLButtonElement | null>(null);
    const modalSubmitRef = useRef<HTMLButtonElement | null>(null);

    const handleClick = () => {
        if (modalTriggerRef.current) modalTriggerRef.current.click();
    };

    const handleCroppedUpload = async (file: File) => {
        console.log(`file`, file);
        const formData = new FormData();
        formData.append("newProfilePic", file);
        if (userDetails.profilePicture?.s3Key) {
            formData.append(
                "profilePicS3Key",
                userDetails.profilePicture.s3Key
            );
        }

        console.log(formData);

        try {
            const request = updateProfilePic(formData).unwrap();
            if (modalSubmitRef.current) modalSubmitRef.current.click();
            toast.promise(request, {
                loading: "updating profile pic",
                success: "profile pic successfully updated",
                error: "Error While updating profile pic",
            });
            await request;
        } catch (error) {
            console.error("error while upadating profile pic", error);
            toast("Error while updating profile pic");
        }
    };

    return (
        <div className="mx-auto w-full">
            <Dialog>
                <DialogTrigger asChild>
                    <button ref={modalTriggerRef} className="hidden">
                        Edit Profile
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Upload Profile picture</DialogTitle>
                        <DialogDescription>
                            Image should have 1:1 aspect ratio
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

            {userDetails.profilePicture && userDetails.profilePicture.url ? (
                <div>
                    <div className="min-h-5 flex justify-center  relative w-fit mx-auto">
                        <div className="size-40 border-2 border-black rounded-full overflow-hidden bg-slate-400">
                            <img
                                key={Date.now()}
                                src={userDetails.profilePicture.url}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div
                            onClick={handleClick}
                            className="absolute bottom-2 right-2 bg-slate-400  p-2 rounded-full border-2 border-slate-500 hover:bg-zinc-500"
                        >
                            <Pencil className="size-4 text-zinc-800" />
                        </div>
                    </div>
                    <p className="font-medium text-center">Profile picture</p>
                </div>
            ) : (
                <div>
                    <p className="font-semibold">Profile Picture</p>
                    <div className="border-2 rounded-base border-black min-h-5 mt-1 relative bg-white">
                        <div
                            onClick={handleClick}
                            className="flex flex-col justify-center items-center my-5 py-5 w-44 mx-auto bg-blue-100 rounded-base border-2 border-dashed border-black cursor-pointer min-h-5"
                        >
                            <Upload />
                            <p>Upload</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePicture;
