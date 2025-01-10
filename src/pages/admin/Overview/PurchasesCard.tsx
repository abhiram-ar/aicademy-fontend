const PurchasesCard = () => {
    const data = null;
    console.log(data);
    return (
        <div className="border-2 bg-white p-8 font-publicSans rounded-base">
            <h3>Purchases</h3>
            <h2 className="text-xl font-semibold mt-3">
                {data ? (
                    +data.purchases.currentMonth
                ) : (
                    <span className="min-w-20 inline-block rounded-base bg-slate-200  ms-2 animate-pulse text-transparent h-6">
                        .
                    </span>
                )}
            </h2>
            <div>
                {" "}
                {data ? (
                    data.purchases.currentMonth - data.purchases.prevMonth >
                    0 ? (
                        <p className="text-green-600">
                            {" "}
                            {(
                                ((data.purchases.currentMonth -
                                    data.purchases.prevMonth) /
                                    data.purchases.prevMonth) *
                                100
                            ).toFixed(2)}
                            % up from last month
                        </p>
                    ) : (
                        <p className="text-red-600">
                            {" "}
                            {(
                                ((data.purchases.prevMonth -
                                    data.purchases.currentMonth) /
                                    data.purchases.prevMonth) *
                                100
                            ).toFixed(2)}
                            % down from last month
                        </p>
                    )
                ) : (
                    <span className="min-w-20 inline-block rounded-base bg-slate-200 animate-pulse text-transparent">
                        .
                    </span>
                )}
            </div>
        </div>
    );
};

export default PurchasesCard;
