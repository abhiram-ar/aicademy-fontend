import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
        </Table>
    );
};

export default CourseSalesTables;
