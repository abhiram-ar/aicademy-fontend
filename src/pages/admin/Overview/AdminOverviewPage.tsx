import React from "react";
import TotalEarningsCard from "./TotalEarningsCard";
import RevenueCard from "./RevenueCard";
import PurchasesCard from "./PurchasesCard";
import BarChart from "./BarChart";

const AdminOverviewPage = () => {
    return (
        <div className="mx-10">
            <h2 className="font-medium text-2xl bg-zinc-300 px-2 rounded-base w-fit -mt-12 ms-2">
                Overview
            </h2>
            <div className="border w-10/12 mx-auto mt-5">
                <div className="grid grid-cols-3 gap-5">
                    <RevenueCard />
                    <PurchasesCard />
                    <TotalEarningsCard />
                </div>
                <div className="mt-5">
                    <BarChart />
                </div>
            </div>
        </div>
    );
};

export default AdminOverviewPage;
