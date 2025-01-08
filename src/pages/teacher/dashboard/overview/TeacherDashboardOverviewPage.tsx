import RevenueCard from "./RevenueCard";
import PurchasesCard from "./PurchasesCard";
import TotalEarningsCard from "./TotalEarningsCard";
import Saleschart from "./BarChart";
import CourseSalesTables from "./CourseSalesTables";

const TeacherDashboardOverview = () => {
    return (
        <div className="">
            <h2 className="bg-zinc-300 w-fit text-xl font-semibold rounded-base px-2 -mt-11 ms-12">
                Overview{" "}
            </h2>
            <div className="mx-20 border mt-10">
                <div className="grid grid-cols-3 gap-5">
                    <RevenueCard />
                    <PurchasesCard />
                    <TotalEarningsCard />
                </div>
                <div className="mt-5">
                    <Saleschart />
                </div>

                <div className="mt-5">
                    <CourseSalesTables />
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboardOverview;
