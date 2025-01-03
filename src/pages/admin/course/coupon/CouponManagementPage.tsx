import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CreateNewCoupon from "./CreateNewCoupon";
import SearchField from "./Search";
import CouponTableBody from "./CouponTableRow";
import { useState } from "react";
import PaginationCoupon from "./Pagination";
import { Toaster } from "@/components/ui/toaster";

const CouponManagementPage = () => {
    const [filter, setFilter] = useState({
        search: "",
        sortBy: "createdAt",
        page: 1,
        limit: 10,
        totalPages: 1,
        data: false,
    });
    return (
        <>
            <Toaster />
            <h2 className="text-2xl font-semibold bg-zinc-300 w-fit mx-10 px-2 rounded-base -mt-12 ms-12">
                Coupons
            </h2>
            <div className="w-2/3 mx-auto font-publicSans">
                <div className="flex justify-center items-center gap-2">
                    <SearchField search={filter.search} setFilter={setFilter} />
                    <CreateNewCoupon />
                </div>

                {/* table */}
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-zinc-700 ">
                                <TableHead className="w-64 text-darkText">
                                    CODE
                                </TableHead>
                                <TableHead className="w-80 text-darkText">
                                    Description
                                </TableHead>
                                <TableHead className="text-darkText">
                                    Status
                                </TableHead>
                                <TableHead className=" text-darkText">
                                    Usage
                                </TableHead>
                                <TableHead className="w-20  text-darkText">
                                    options
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <CouponTableBody
                            filter={filter}
                            setFilter={setFilter}
                        />
                    </Table>
                </div>
                <div>
                    {filter.data && filter.totalPages && (
                        <PaginationCoupon
                            page={filter.page}
                            totalPages={filter.totalPages}
                            setFilter={setFilter}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default CouponManagementPage;
