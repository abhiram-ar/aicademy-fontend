import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Table,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TableBody } from "@mui/material";
import { Ellipsis, ShieldAlert } from "lucide-react";
import {
    useBlockUserAdminUserManagementMutation,
    useGetUserDetailsAdminUserManagementQuery,
    useUnBlockUserAdminUserManagementMutation,
} from "./userApiSlice";
import { useState } from "react";
import SearchUser from "./Search";

type userDetails = {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    isBlocked: boolean;
};

const UserManagementPage = () => {
    const [filter, setFilter] = useState({
        search: "",
        limit: 10,
        page: 1,
    });
    const { data: currentData } =
        useGetUserDetailsAdminUserManagementQuery(filter);

    const [unblockUser] = useUnBlockUserAdminUserManagementMutation();
    const [blockUser] = useBlockUserAdminUserManagementMutation();

    const handleUnBlockUser = async (userId: string) => {
        try {
            await unblockUser({ userId }).unwrap();
        } catch (error) {
            console.error("error while unblocking user", error);
        }
    };
    const handleBlockUser = async (userId: string) => {
        try {
            await blockUser({ userId }).unwrap();
        } catch (error) {
            console.error("error while unblocking user", error);
        }
    };

    return (
        <div className="mx-10">
            <h2 className="font-medium text-2xl bg-zinc-300 px-2 rounded-base w-fit -mt-12 ms-2">
                User Management
            </h2>
            <div className="w-fit mx-auto">
                <SearchUser search={filter.search} setFilter={setFilter} />
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-zinc-700 ">
                                <TableHead className="w-32 text-darkText">
                                    First name
                                </TableHead>
                                <TableHead className="w-32 text-darkText">
                                    Last name
                                </TableHead>
                                <TableHead className="w-52 text-darkText">
                                    Email
                                </TableHead>
                                <TableHead className="w-52 text-center text-darkText">
                                    UID
                                </TableHead>
                                <TableHead className="w-30 text-center text-darkText">
                                    isBlocked
                                </TableHead>
                                <TableHead className="w-20 text-center text-darkText">
                                    option
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentData &&
                                currentData.userList.length === 0 && (
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell
                                            colSpan={4}
                                            className="text-center"
                                        >
                                            <p className="flex justify-center items-center gap-3 p-5 -ms-10">
                                                <ShieldAlert />
                                                No user found
                                            </p>
                                        </TableCell>

                                        <TableCell></TableCell>
                                    </TableRow>
                                )}
                            {currentData &&
                                currentData.userList &&
                                currentData.userList.map(
                                    (userDetails: userDetails) => (
                                        <TableRow
                                            key={userDetails._id}
                                            className={`${
                                                userDetails.isBlocked
                                                    ? "bg-red-200 hover:bg-red-300 text-black/50 hover:text-black/80 "
                                                    : "hover:bg-slate-300 "
                                            } `}
                                        >
                                            <TableCell>
                                                {userDetails.firstName}
                                            </TableCell>
                                            <TableCell>
                                                {userDetails.lastName}
                                            </TableCell>
                                            <TableCell>
                                                {userDetails.email}
                                            </TableCell>
                                            <TableCell>
                                                {userDetails._id}
                                            </TableCell>
                                            <TableCell>
                                                {userDetails.isBlocked
                                                    ? "True"
                                                    : "False"}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <button className="h-8 w-8 p-0 bg-slate-300 flex justify-center items-center rounded-base hover:bg-slate-400 focus:outline-none">
                                                            <Ellipsis className="size-4" />
                                                        </button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent
                                                        align="end"
                                                        className="bg-white px-2"
                                                    >
                                                        <DropdownMenuLabel>
                                                            Actions
                                                        </DropdownMenuLabel>

                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                return userDetails.isBlocked
                                                                    ? handleUnBlockUser(
                                                                          userDetails._id
                                                                      )
                                                                    : handleBlockUser(
                                                                          userDetails._id
                                                                      );
                                                            }}
                                                            className="bg-white hover:bg-slate-400 border-0 px-3"
                                                        >
                                                            {userDetails.isBlocked
                                                                ? "Unblock user"
                                                                : "Block user"}
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                        </TableBody>
                    </Table>
                </div>
                <Pagination className="mt-5">
                    <PaginationContent>
                        {filter.page > 1 && (
                            <PaginationItem className="cursor-pointer">
                                <PaginationPrevious
                                    onClick={() =>
                                        setFilter((value) => ({
                                            ...value,
                                            page: filter.page - 1,
                                        }))
                                    }
                                />
                            </PaginationItem>
                        )}

                        {currentData &&
                            Array.from({
                                length: parseInt(currentData.pages),
                            }).map((_, index) => (
                                <PaginationItem
                                    key={index + 1}
                                    className="cursor-pointer"
                                >
                                    <PaginationLink
                                        className={`${
                                            index + 1 === filter.page &&
                                            "bg-black text-white"
                                        }`}
                                        onClick={() =>
                                            setFilter((value) => ({
                                                ...value,
                                                page: index + 1,
                                            }))
                                        }
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                        {currentData &&
                            filter.page < parseInt(currentData.pages) && (
                                <PaginationItem className="cursor-pointer">
                                    <PaginationNext
                                        onClick={() =>
                                            setFilter((value) => ({
                                                ...value,
                                                page: filter.page + 1,
                                            }))
                                        }
                                    />
                                </PaginationItem>
                            )}
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default UserManagementPage;
