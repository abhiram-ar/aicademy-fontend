import SingleOrder from "./SingleOrder";
import { useGetUserPurchaseHistoryQuery } from "./OrderPageApiSlice";
import { ICourse } from "../explore/Types";

export interface IOrder {
    coupon: {
        couponApplied: boolean;
        couponCode: string;
        couponDiscountAmount: number;
    };
    _id: string;
    coursesBought: {
        courseId: ICourse;
        soldPrice: number;
    }[];

    orderValue: number;
    totalDiscount: number;
    createdAt: Date;
}

const OrdersPage = () => {
    const { data } = useGetUserPurchaseHistoryQuery({});
    console.log(data);
    return (
        <div>
           
            <div className="w-full min-h-screen bg-paperYellow py-10">
                <div className="w-9/12 mx-auto">
                    <h2 className="text-xl font-medium bg-zinc-300 w-fit px-2 rounded-base">
                        My Purchases
                    </h2>

                    {/* purchases grid */}
                    <div className="mx-10 mt-5">
                        {data &&
                            data.orderHistory.map((order: IOrder) => (
                                <SingleOrder
                                    key={order._id}
                                    orderDetails={order}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
