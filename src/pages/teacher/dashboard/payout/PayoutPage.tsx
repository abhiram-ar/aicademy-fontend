import PayoutTransactionsTable from "./PayoutHistoryTable";
import Withdraw from "./Withdraw";
import BankVerification from "./BankVerification";
import {
    useGetWithdawableAmountandTotalCashedoutQuery,
    useIsTeacherBankAccountVerifiedQuery,
} from "./PayoutPageApiSlice";

const PayoutPage = () => {
    const { currentData: data } = useIsTeacherBankAccountVerifiedQuery({});
    const { data: amounts } = useGetWithdawableAmountandTotalCashedoutQuery({});
    return (
        <div className="font-publicSans">
            <h2 className="bg-zinc-200 w-fit text-xl font-semibold rounded-base px-2 -mt-11 ms-12">
                Payout{" "}
            </h2>

            {/* contnnt */}
            <div className="mx-20 mt-10">
                {/* cards grid */}
                <div className="grid grid-cols-2 gap-5">
                    <div className="bg-white rounded-base border-2 p-8">
                        <p>Earnings</p>
                        <div className="flex justify-between items-center mt-1">
                            {amounts ? (
                                <h2 className="text-2xl font-semibold">
                                    {amounts.withdrawable.toLocaleString(
                                        "en-IN",
                                        {
                                            style: "currency",
                                            currency: "INR",
                                        }
                                    )}
                                </h2>
                            ) : (
                                <h2 className="text-2xl bg-zinc-300 w-32 rounded-base text-transparent animate-pulse">
                                    .
                                </h2>
                            )}
                            {!data ||
                                (!amounts && (
                                    <div className="animate-pulse w-36 h-11 bg-zinc-200 rounded-base"></div>
                                ))}
                            {data &&
                                amounts &&
                                (data.isVerified ? (
                                    <Withdraw
                                        withdrawable={amounts.withdrawable}
                                    />
                                ) : (
                                    <BankVerification />
                                ))}
                        </div>
                        <p className="text-zinc-400 text-sm text-right mt-1">
                            (min. withdraw amount should be 1000)
                        </p>
                    </div>

                    <div className="bg-white rounded-base border-2 p-8">
                        <p>Total Cashedout</p>
                        {amounts ? (
                            <h2 className="text-3xl font-semibold mt-3">
                                {amounts &&
                                    amounts.totalAmountCheckedout.toLocaleString(
                                        "en-IN",
                                        { style: "currency", currency: "INR" }
                                    )}
                            </h2>
                        ) : (
                            <h2 className="text-3xl mt-3 bg-zinc-300 w-40 rounded-base text-transparent animate-pulse">
                                .
                            </h2>
                        )}
                    </div>
                </div>

                {/* table */}
                <div className="mt-5">
                    <PayoutTransactionsTable />
                </div>
            </div>
        </div>
    );
};

export default PayoutPage;
