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
import { ITeacher } from "./ITeacher";

const TeacherOnboadingPage = () => {
    const { data } = useGetOnbordPendingQuery({});
    const [selectedTeacher, setSelectedTeacher] = useState<ITeacher | null>(
        null
    );

    console.log(data);

    return (
        <div className="">
            {selectedTeacher &&
                createPortal(
                    <TeacherInfoModal
                        teacherDetails={selectedTeacher}
                        setSelectedTeacher={setSelectedTeacher}
                    />,
                    document.body
                )}
            <h2 className="font-medium text-2xl bg-zinc-300 px-2 rounded-base w-fit -mt-12 ms-12">
                Teacher Onboarding
            </h2>
            <div className="w-10/12 mx-auto mt-5">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-zinc-700 ">
                            <TableHead className="w-60 max-w-80 text-darkText">
                                Legal name
                            </TableHead>
                            <TableHead className="w-60 text-darkText">
                                Requested time
                            </TableHead>
                            <TableHead className="w-80 text-darkText">
                                Email
                            </TableHead>
                            <TableHead className=" w-80 text-center text-darkText">
                                Qualification
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data &&
                            data.onboardingTeacherList.map(
                                (teacher: ITeacher) => (
                                    <TableRow
                                        key={teacher._id}
                                        className="hover:bg-green-100"
                                        onClick={() =>
                                            setSelectedTeacher(teacher)
                                        }
                                    >
                                        <TableCell className="font-base">
                                            {teacher.legalName}
                                        </TableCell>

                                        <TableCell>{teacher.email}</TableCell>

                                        <TableCell>
                                            {new Date(
                                                teacher.updatedAt
                                            ).toLocaleString("en-GB", {
                                                timeZone: "UTC",
                                            })}
                                        </TableCell>

                                        <TableCell className="w-60 max-w-80 truncate">
                                            {teacher.education}
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TeacherOnboadingPage;
