import ProfilePicture from "./profilePic/ProfilePicture";
import { useGetUserProfileQuery } from "./profileApiSlice";
import ProfileForm from "./ProfileForm";
import { Toaster } from "react-hot-toast";

const ProfileOutlet = () => {
    const { currentData } = useGetUserProfileQuery({});
    console.log(currentData);

    return (
        <div className="w-full border border-black rounded-base px-5 md:px-10 py-10 bg-zinc-50">
            <Toaster position="bottom-right" />
            {currentData && (
                <div>
                    <ProfilePicture userDetails={currentData.userDetails} />
                    <div>
                        <ProfileForm userDetails={currentData.userDetails} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileOutlet;
