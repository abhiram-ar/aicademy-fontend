const ProfitCard = () => {
    const data = false;
    return (
        <div className="border-2 bg-white p-8 font-publicSans rounded-base">
            <h3>Profit</h3>
            <h2 className="text-xl font-semibold mt-3">
                {data ? (
                    data.revenue.currentMonth.toLocaleString("en-IN", {
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
                {data ? (
                    data.revenue.currentMonth - data.revenue.prevMonth > 0 ? (
                        <p className="text-green-600">
                            {" "}
                            {(
                                ((data.revenue.currentMonth -
                                    data.revenue.prevMonth) /
                                    data.revenue.prevMonth) *
                                100
                            ).toFixed(2)}
                            % up from last month
                        </p>
                    ) : (
                        <p className="text-red-600">
                            {" "}
                            {(
                                ((data.revenue.prevMonth -
                                    data.revenue.currentMonth) /
                                    data.revenue.prevMonth) *
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
