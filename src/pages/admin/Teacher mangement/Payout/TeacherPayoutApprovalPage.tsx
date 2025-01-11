import PayoutTransactionsTable from "./PayoutHistoryTable";

const TeacherPayoutApprovalPage = () => {
    return (
        <div className="mx-10">
            <h2 className="font-medium text-2xl bg-zinc-300 px-2 rounded-base w-fit -mt-12 ms-2">
                Payout Requests
            </h2>
            {/* table */}
            <div className="w-10/12 mx-auto mt-5">
                <PayoutTransactionsTable />
            </div>
        </div>
    );
};

export default TeacherPayoutApprovalPage;
