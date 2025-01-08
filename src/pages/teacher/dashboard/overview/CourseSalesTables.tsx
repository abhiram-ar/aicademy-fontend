import { ShieldAlert } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
const CourseSalesTables = () => {
    return (
        <Table>
            <TableHeader>
                <TableRow className="bg-zinc-700">
                    <TableHead className="w-80 text-darkText">
                        Course Name
                    </TableHead>
                    <TableHead className="w-80 text-darkText">
                        Student
                    </TableHead>

                    <TableHead className="w-20 text-center text-darkText">
                        Revenue
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* no course */}
                {true && (
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>
                            <p className="flex justify-center items-center gap-3 p-5 -ms-96 ">
                                <ShieldAlert />
                                No purchases
                            </p>
                        </TableCell>

                        <TableCell></TableCell>
                    </TableRow>
                )}

                <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};

export default CourseSalesTables;
