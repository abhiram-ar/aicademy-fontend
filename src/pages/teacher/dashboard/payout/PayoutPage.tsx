import PayoutTransactionsTable from "./PayoutHistoryTable";
import Withdraw from "./Withdraw";
import BankVerification from "./BankVerification";
import { useIsTeacherBankAccountVerifiedQuery } from "./PayoutPageApiSlice";

const PayoutPage = () => {
    const { currentData: data } = useIsTeacherBankAccountVerifiedQuery({});
    return (
        <div className="font-publicSans">
            <h2 className="bg-zinc-300 w-fit text-xl font-semibold rounded-base px-2 -mt-11 ms-12">
                Payout{" "}
            </h2>

            {/* contnnt */}
            <div className="mx-20 border mt-10">
                {/* cards grid */}
                <div className="grid grid-cols-2 gap-5">
                    <div className="bg-white rounded-base border p-8">
                        <p>Earnings</p>
                        <div className="flex justify-between items-center mt-1">
                            <h2 className="text-2xl font-semibold">5200</h2>
                            {!data && (
                                <div className="animate-pulse w-36 h-11 bg-zinc-300 rounded-base"></div>
                            )}
                            {data &&
                                (data.isVerified ? (
                                    <Withdraw />
                                ) : (
                                    <BankVerification />
                                ))}
                        </div>
                        <p className="text-zinc-400 text-sm text-right mt-1">
                            (min. withdraw amount should be 1000)
                        </p>
                    </div>

                    <div className="bg-white rounded-base border p-8">
                        <p>Total cashedout</p>
                        <h2 className="text-3xl font-semibold mt-3">5200</h2>
                    </div>
                </div>

                {/* table */}
                <div className="border mt-5">
                    <PayoutTransactionsTable />
                </div>
            </div>
        </div>
    );
};

export default PayoutPage;
