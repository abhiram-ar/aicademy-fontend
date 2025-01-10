import { MonthlyOverview } from "./AdminOverviewPage";

type Props = {
    currentMonthReport: MonthlyOverview;
    prevMonthReport: MonthlyOverview;
};

const ProfitCard: React.FC<Props> = ({
    currentMonthReport,
    prevMonthReport,
}) => {
    return (
        <div className="border-2 bg-white p-8 font-publicSans rounded-base">
            <h3>Profit</h3>
            <h2 className="text-xl font-semibold mt-3">
                {currentMonthReport ? (
                    currentMonthReport.totalProfit.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                    })
                ) : (
                    <span className="min-w-20 inline-block rounded-base bg-slate-200  ms-2 animate-pulse text-transparent h-6">
                        .
                    </span>
                )}
            </h2>
            <div>
                {" "}
                {currentMonthReport && prevMonthReport ? (
                    currentMonthReport.totalProfit -
                        prevMonthReport.totalProfit >
                    0 ? (
                        <p className="text-green-600">
                            {" "}
                            {(
                                ((currentMonthReport.totalProfit -
                                    prevMonthReport.totalProfit) /
                                    prevMonthReport.totalProfit) *
                                100
                            ).toFixed(2)}
                            % up from last month
                        </p>
                    ) : (
                        <p className="text-red-600">
                            {" "}
                            {(
                                ((prevMonthReport.totalProfit -
                                    prevMonthReport.totalProfit) /
                                    prevMonthReport.totalProfit) *
                                100
                            ).toFixed(2)}
                            % down from last month
                        </p>
                    )
                ) : (
                    <span className="min-w-20 inline-block rounded-base bg-slate-200  ms-2 animate-pulse text-transparent">
                        .
                    </span>
                )}
            </div>
        </div>
    );
};

export default ProfitCard;
