import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import CreateNewCoupon from "./CreateNewCoupon";
import SearchField from "./Search";
import CouponTableBody from "./CouponTableRow";

const CouponManagementPage = () => {
    return (
        <>
            <h2 className="text-2xl font-semibold bg-zinc-300 w-fit mx-10 px-2 rounded-base -mt-12 ms-12">
                Coupons
            </h2>
            <div className="w-2/3 mx-auto font-publicSans">
                <div className="flex justify-center items-center gap-2">
                    <SearchField />
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
                        <CouponTableBody />
                    </Table>
                </div>
            </div>
        </>
    );
};

export default CouponManagementPage;
