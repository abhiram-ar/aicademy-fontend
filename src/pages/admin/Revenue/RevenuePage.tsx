import RevenueTable from "./RevenueTable";

const AdminRevenuePage = () => {
    return (
        <div className="">
            <h2 className="ms-12 font-medium text-2xl bg-zinc-300 px-2 rounded-base w-fit -mt-12">
               Revenue 
            </h2>
            <div className="w-10/12 mx-auto mt-5">
                <div>
                    <RevenueTable />
                </div>
            </div>
        </div>
    );
};

export default AdminRevenuePage;
