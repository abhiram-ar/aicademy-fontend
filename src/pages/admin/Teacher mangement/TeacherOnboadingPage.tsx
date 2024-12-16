import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGetOnbordPendingQuery } from "@/redux/features/admin/teacher mangement/onboardingAPI";

const TeacherOnboadingPage = () => {
    const { data, isFetching, isLoading, isError } = useGetOnbordPendingQuery();

    console.log(data);

    const renderList = new Array(7).fill("loading..");

    return (
        <div className="">
            <Table>
                <TableHeader>
                    <TableRow className="bg-zinc-700 ">
                        <TableHead className="w-52 max-w-80 text-darkText">
                            Legal name
                        </TableHead>
                        <TableHead className="text-darkText">
                            Requested time
                        </TableHead>
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
                                onClick={() => alert("hey")}
                            >
                                <TableCell className="font-base">
                                    {teacher.legalName}
                                </TableCell>
                                <TableCell>{Date(teacher.updatedAt)}</TableCell>
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
