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

const TeacherOnboadingPage = () => {
    const { data, isFetching, isLoading, isError } = useGetOnbordPendingQuery(
        {}
    );
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    console.log(selectedTeacher);

    const renderList = new Array(7).fill("loading..");

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
                        data.onboardingTeacherList.map((teacher) => (
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
