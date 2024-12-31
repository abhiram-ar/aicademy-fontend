import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TableBody } from "@mui/material";
import { Ellipsis, Search } from "lucide-react";

const mockdata = [
    {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        uid: "UID12345",
        isBlocked: false,
        option: "Edit",
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        uid: "UID67890",
        isBlocked: true,
        option: "Edit",
    },
    {
        firstName: "Michael",
        lastName: "Johnson",
        email: "michael.johnson@example.com",
        uid: "UID11223",
        isBlocked: false,
        option: "Edit",
    },
    {
        firstName: "Emily",
        lastName: "Davis",
        email: "emily.davis@example.com",
        uid: "UID44556",
        isBlocked: true,
        option: "Edit",
    },
    {
        firstName: "David",
        lastName: "Brown",
        email: "david.brown@example.com",
        uid: "UID77889",
        isBlocked: false,
        option: "Edit",
    },
];

const UserManagementPage = () => {
    const userDetails = mockdata;

    return (
        <div className="px-20 py-10">
            <h2 className="font-medium text-2xl bg-zinc-300 px-1 rounded-base">
                User Management
            </h2>

            <div className="flex w-fit justify-center items-center border-2 border-black rounded-base px-2  py-2 gap-2">
                <Search />
                <input type="text" className="border-none outline-none" />
            </div>

            <div>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-zinc-700 ">
                            <TableHead className=" text-darkText">
                                First name
                            </TableHead>
                            <TableHead className="text-darkText">
                                Last name
                            </TableHead>
                            <TableHead className="text-darkText">
                                Email
                            </TableHead>
                            <TableHead className="text-center text-darkText">
                                UID
                            </TableHead>
                            <TableHead className="text-center text-darkText">
                                isBlocked
                            </TableHead>
                            <TableHead className="text-center text-darkText">
                                option
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userDetails.map((user) => (
                            <>
                                <TableRow
                                    className={`${
                                        user.isBlocked
                                            ? "bg-red-200 hover:bg-red-300 text-black/50 hover:text-black/80 "
                                            : "hover:bg-slate-300 "
                                    } `}
                                >
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.uid}</TableCell>
                                    <TableCell>
                                        {user.isBlocked ? "True" : "False"}
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button className="h-8 w-8 p-0 bg-slate-300 flex justify-center items-center rounded-base hover:bg-slate-400 focus:outline-none">
                                                    <Ellipsis className="size-4" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                align="end"
                                                className="bg-slate-300 px-2"
                                            >
                                                <DropdownMenuLabel>
                                                    Actions
                                                </DropdownMenuLabel>
                                                <DropdownMenuItem className="bg-slate-300 hover:bg-slate-400 border-0 px-3 ">
                                                    View full profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="bg-slate-300 hover:bg-slate-400 border-0 px-3">
                                                    Block user
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            </>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default UserManagementPage;
