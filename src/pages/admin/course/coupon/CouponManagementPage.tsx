import CreateNewCoupon from "./CreateNewCoupon";
import SearchField from "./Search";

const CouponManagementPage = () => {
    return (
        <>
            <h2 className="text-2xl font-semibold bg-zinc-300 w-fit mx-10 px-2 rounded-base">
                Coupons
            </h2>
            <div className="w-2/3 mx-auto font-publicSans">
                <div className="flex justify-center items-center gap-2">
                    <SearchField />
                    <CreateNewCoupon />
                </div>
            </div>
        </>
    );
};

export default CouponManagementPage;
