import React from "react";
import ProfilePicture from "./profilePic/ProfilePicture";
import { useGetUserProfileQuery } from "./profileApiSlice";

const ProfileOutlet = () => {
    const { currentData } = useGetUserProfileQuery({});
    console.log(currentData);

    return (
        <div className="border border-red-200 py-5">
            {currentData && (
                <ProfilePicture userDetails={currentData.userDetails} />
            )}
        </div>
    );
};

export default ProfileOutlet;
