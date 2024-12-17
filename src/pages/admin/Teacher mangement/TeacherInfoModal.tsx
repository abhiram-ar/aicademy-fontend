import {
    useApproveOnboardingMutation,
    useRejectOnboardingMutation,
} from "@/redux/features/admin/teacher mangement/onboardingAPI";
import { CircleX } from "lucide-react";
import React from "react";

export interface ITeacher {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "teacher" | "admin" | "student";
    isVerified: boolean;
    isApproved: "pending" | "approved" | "rejected";
    isBlocked: boolean;
    coursesCreated: string[];
    createdAt: string;
    updatedAt: string;
    biography: string;
    college: string;
    country: string;
    education: string;
    legalName: string;
    legalNameProof: {
        url: string;
        public_id: string;
    };
    phoneNo: number;
    profilePic: {
        url: string;
        public_id: string;
    };
    qualification: string;
    qualificationProof: {
        url: string;
        public_id: string;
    };
    remark: string;
}

interface Props {
    teacherDetails: ITeacher;
    setSelectedTeacher: (data: ITeacher | null) => void;
}

const TeacherInfoModal: React.FC<Props> = ({
    teacherDetails,
    setSelectedTeacher,
}) => {
    const [approve] = useApproveOnboardingMutation();
    const [reject] = useRejectOnboardingMutation();

    const handleApproval = async (teacherId: string) => {
        console.log(teacherId);
        try {
            const res = await approve({ teacherId: teacherId });
            console.log(res);
            setSelectedTeacher(null);
        } catch (error) {
            console.error("errorr while approving user", error);
        }
    };

    const handleReject = async (teacherId: string) => {
        console.log(teacherId);
        try {
            const res = await reject({ teacherId: teacherId });
            console.log(res);
            setSelectedTeacher(null);
        } catch (error) {
            console.error("errorr while rejecting user", error);
        }
    };

    return (
        <div className="absolute inset-0  bg-zinc-900/50 z-40">
            <div className="relative bg-white border-2 border-black rounded-base w-2/3 mx-auto p-5 mt-5">
                <h2 className="text-xl font-semibold pb-5">
                    Onbording teacher details
                </h2>
                <button
                    onClick={() => setSelectedTeacher(null)}
                    className="absolute right-3 top-3"
                >
                    <CircleX className={`text-black hover:text-red-600`} />
                </button>
                <p>
                    <span className="font-semibold">Legal name: </span>{" "}
                    {teacherDetails?.legalName}
                </p>
                <p>
                    <span className="font-semibold">Biography: </span>{" "}
                    {teacherDetails?.biography}
                </p>
                <p>
                    <span className="font-semibold">Country: </span>{" "}
                    {teacherDetails?.country}
                </p>
                <p>
                    <span className="font-semibold">Phone: </span>{" "}
                    {teacherDetails?.phoneNo}
                </p>
                <p>
                    <span className="font-semibold">Education: </span>{" "}
                    {teacherDetails?.education}
                </p>
                <p>
                    <span className="font-semibold">College: </span>{" "}
                    {teacherDetails?.college}
                </p>
                <p>
                    <span className="font-semibold">Remark: </span>{" "}
                    {teacherDetails?.remark}
                </p>
                <hr className="my-3" />
                <p className="relative">
                    <span className="font-semibold">
                        Profile picture - ld proof:
                    </span>
                </p>
                <div className=" w-full flex justify-center gap-5 h-40">
                    <img
                        src={teacherDetails.profilePic?.url}
                        alt="profile picture"
                        className="rounded-base"
                    />

                    <img
                        src={teacherDetails.legalNameProof?.url}
                        alt="legal name proof document"
                        className="rounded-base"
                    />
                </div>

                <hr className="my-3" />
                <p className="font-semibold">Qualification: {teacherDetails?.qualification}</p>
                <div className="w-full flex justify-center">
                    <img
                        src={teacherDetails.qualificationProof?.url}
                        alt="qualification-proof"
                        className="rounded-base h-40"
                    />
                </div>
                <div className="flex justify-end gap-3 w-full mt-5">
                    <button
                        onClick={() => handleReject(teacherDetails._id)}
                        className="bg-red-500 border-2 border-black rounded-base px-5 py-2"
                    >
                        reject
                    </button>
                    <button
                        onClick={() => handleApproval(teacherDetails._id)}
                        className="bg-green-500 border-2 border-black rounded-base px-5 py-2"
                    >
                        approve
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeacherInfoModal;
