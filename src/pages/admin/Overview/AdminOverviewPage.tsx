import RevenueCard from "./RevenueCard";
import PurchaseCard from "./PurchasesCard";
import BarChart from "./BarChart";
import ProfitCard from "./ProfitCard";
import { useGetLastTwoMonthOverviewAdminQuery } from "./AdminOverviewApiSlice";
import { NoOfusersChart } from "./NoOfUsersChart";

export type MonthlyOverview = {
    _id: {
        month: number;
        year: number;
    };
    totalRevenue: number;
    totalProfit: number;
    totalSales: number;
};

const AdminOverviewPage = () => {
    const { data } = useGetLastTwoMonthOverviewAdminQuery({});
    return (
        <div className="">
            <h2 className="font-medium text-2xl bg-zinc-300 px-2 rounded-base w-fit -mt-12 ms-12">
                Overview
            </h2>
            <div className="w-10/12 mx-auto mt-5">
                <div className="grid grid-cols-3 gap-5">
                    <RevenueCard
                        currentMonthReport={data?.currentMonthReport}
                        prevMonthReport={data?.prevMonthReport}
                    />
                    <PurchaseCard
                        currentMonthReport={data?.currentMonthReport}
                        prevMonthReport={data?.prevMonthReport}
                    />
                    <ProfitCard
                        currentMonthReport={data?.currentMonthReport}
                        prevMonthReport={data?.prevMonthReport}
                    />
                </div>
                <div className="mt-5">
                    <BarChart />
                </div>
                <div className="mt-5">
                    <NoOfusersChart />
                </div>
            </div>
        </div>
    );
};

export default AdminOverviewPage;
