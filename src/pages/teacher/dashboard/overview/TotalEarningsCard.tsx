import { useGetLifetimeEarningQuery } from "./OverviewPageApiSlice";

const TotalEarningsCard = () => {
    const { data } = useGetLifetimeEarningQuery({});

    return (
        <div className="border bg-white p-8 font-publicSans rounded-base">
            <h3>Total Earnings</h3>
            <h2 className="text-2xl font-semibold mt-3">
                {" "}
                {data ? (
                    data.lifetimeEarning.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                    })
                ) : (
                    <span className="min-w-20 inline-block rounded-base bg-slate-200  ms-2 animate-pulse text-transparent h-6">
                        .
                    </span>
                )}
            </h2>
        </div>
    );
};

export default TotalEarningsCard;
