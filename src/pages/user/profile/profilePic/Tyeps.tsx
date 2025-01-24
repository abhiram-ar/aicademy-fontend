
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
