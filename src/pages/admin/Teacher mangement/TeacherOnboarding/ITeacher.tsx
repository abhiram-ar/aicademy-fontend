
export interface ITeacher {
    _id: string; // MongoDB ObjectId in string format
    firstName: string;
    lastName: string;
    email: string;
    password: string; // Hashed password
    role: "teacher" | "admin" | "student"; // Assuming possible roles
    isVerified: boolean;
    isApproved: "pending" | "approved" | "rejected"; // Approval status
    isBlocked: boolean;
    coursesCreated: string[]; // Array of course IDs or course names
    createdAt: string; // ISO string
    updatedAt: string; // ISO string
    biography: string;
    college: string;
    country: string;
    education: string;
    legalName: string;
    legalNameProof: {
        url: string; // URL to the proof document
        public_id: string; // Cloudinary or other storage identifier
    };
    phoneNo: number; // Assuming a valid 10-digit phone number
    profilePic: {
        url: string; // URL to the profile picture
        public_id: string; // Cloudinary or other storage identifier
    };
    qualification: string;
    qualificationProof: {
        url: string; // URL to the qualification proof document
        public_id: string; // Cloudinary or other storage identifier
    };
    remark: string; // Additional remark from the teacher
}
