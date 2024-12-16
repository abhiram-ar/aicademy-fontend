import { useState } from "react";
import { useGetOnbordPendingQuery } from "@/redux/features/admin/teacher mangement/onboardingAPI";
import TeacherInfoModal from "./TeacherInfoModal";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { createPortal } from "react-dom";

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

const TeacherOnboadingPage = () => {
    const { data } = useGetOnbordPendingQuery({});
    const [selectedTeacher, setSelectedTeacher] = useState<ITeacher | null>(
        null
    );

    return (
        <div className="absolute ms-20 w-2/3 ">
            {selectedTeacher &&
                createPortal(
                    <TeacherInfoModal
                        teacherDetails={selectedTeacher}
                        setSelectedTeacher={setSelectedTeacher}
                    />,
                    document.body
                )}
            <h2 className="text-2xl font-semibold my-5 bg-zinc-300 rounded-base px-2 py-1 w-fit">
                Teacher Onboarding
            </h2>
            <Table>
                <TableHeader>
                    <TableRow className="bg-zinc-700 ">
                        <TableHead className="w-52 max-w-80 text-darkText">
                            Legal name
                        </TableHead>
                        <TableHead className="text-darkText">
                            Requested time
                        </TableHead>
                        <TableHead className="text-darkText">Email</TableHead>
                        <TableHead className="text-center text-darkText">
                            Qualification
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data &&
                        data.onboardingTeacherList.map((teacher: ITeacher) => (
                            <TableRow
                                key={teacher._id}
                                className="hover:bg-green-100"
                                onClick={() => setSelectedTeacher(teacher)}
                            >
                                <TableCell className="font-base">
                                    {teacher.legalName}
                                </TableCell>

                                <TableCell>{teacher.email}</TableCell>

                                <TableCell>
                                    {new Date(teacher.updatedAt).toLocaleString(
                                        "en-GB",
                                        { timeZone: "UTC" }
                                    )}
                                </TableCell>

                                <TableCell className="w-60 max-w-80 truncate">
                                    {teacher.education}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TeacherOnboadingPage;
