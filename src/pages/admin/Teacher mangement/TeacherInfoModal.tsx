import {
    useApproveOnboardingMutation,
    useRejectOnboardingMutation,
} from "@/redux/features/admin/teacher mangement/onboardingAPI";
import { CircleX } from "lucide-react";
import React from "react";
interface Props {
    teacherDetails: object;
    setSelectedTeacher: (data: object | null) => void;
}
const TeacherInfoModal: React.FC<Props> = ({
    teacherDetails,
    setSelectedTeacher,
}) => {
    const [approve] = useApproveOnboardingMutation();
    const [reject] = useRejectOnboardingMutation();

    const handleApproval = async (teacherId) => {
        console.log(teacherId);
        try {
            const res = await approve({ teacherId: teacherId });
            console.log(res);
            setSelectedTeacher(null);
        } catch (error) {
            console.error("errorr while approving user", error);
        }
    };

    const handleReject = async (teacherId) => {
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
                    <span>Legal name</span>:{teacherDetails?.legalName}
                </p>
                <p>Biography: {teacherDetails?.biography}</p>
                <p>Country: {teacherDetails?.country}</p>
                <p>Phone: {teacherDetails?.phoneNo}</p>
                <p>Education: {teacherDetails?.education}</p>
                <p>College: {teacherDetails?.college}</p>
                <p>Remark: {teacherDetails?.remark}</p>
                <hr className="my-3" />
                <p className="relative">Profile picture - ld proof:</p>
                <div className=" w-full flex justify-center gap-5 h-40">
                    <img
                        src={teacherDetails.profilePic.url}
                        alt="profile picture"
                        className="rounded-base"
                    />

                    <img
                        src={teacherDetails.legalNameProof.url}
                        alt="legal name proof document"
                        className="rounded-base"
                    />
                </div>

                <hr className="my-3" />
                <p>Qualification: {teacherDetails?.qualification}</p>
                <div className="w-full flex justify-center">
                    <img
                        src={teacherDetails.qualificationProof.url}
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
