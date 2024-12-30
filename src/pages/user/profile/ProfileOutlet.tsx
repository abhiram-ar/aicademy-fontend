import React from "react";
import ProfilePicture from "./profilePic/ProfilePicture";
import { useGetUserProfileQuery } from "./profileApiSlice";
import ProfileForm from "./ProfileForm";

const ProfileOutlet = () => {
    const { currentData } = useGetUserProfileQuery({});
    console.log(currentData);

    return (
        <div className="border border-red-200 py-5">
            {currentData && (
                <div>
                    <ProfilePicture userDetails={currentData.userDetails} />
                    <div>
                        <ProfileForm userDetails={currentData.userDetails}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileOutlet;
