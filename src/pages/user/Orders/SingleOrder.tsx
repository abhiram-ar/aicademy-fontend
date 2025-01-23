import CourseCard from "./CourseCard";
import { IOrder } from "./Types";

type Props = {
    orderDetails: IOrder;
};

const SingleOrder: React.FC<Props> = ({ orderDetails }) => {
    return (
        <div className="border-2 border-zinc-200 bg-white rounded-base p-2 md:p-5 pb-10 mb-3">
            <h2 className="font-semibold text-lg mb-3 ">
                orderID <span>#{orderDetails._id}</span>
            </h2>

            {/* courses detils */}
            <div className=" p-2 md:p-8 border bg-slate-100 md:mx-10 rounded-base border-zinc-300">
                <h2 className="font-medium my-2 underline  md:-mt-5  text-lg">
                    Course purchased
                </h2>
                {orderDetails?.coursesBought
                    .map((course) => ({
                        ...course.courseId,
                        price: course.soldPrice,
                    }))
                    .map((course) => (
                        <CourseCard key={course._id} course={course} />
                    ))}
            </div>

            {/* details */}
            <div className="px-2 md:px-8 py-5 border bg-yellow-100  md:mx-10 rounded-base border-zinc-300 mt-2 flex justify-between items-center">
                <div>
                    <p>
                        <span className="font-medium">Purchsed on : </span>
                        {new Date(orderDetails.createdAt).toLocaleString()}
                    </p>
                    {orderDetails.coupon.couponCode && (
                        <>
                            <p>
                                <span className="font-medium">
                                    Coupon Appied:{" "}
                                </span>
                                {orderDetails.coupon.couponCode ?? "nill"}
                            </p>
                            <p>
                                <span className="font-medium">
                                    coupon discout:{" "}
                                </span>

                                {orderDetails.coupon.couponDiscountAmount}
                            </p>
                        </>
                    )}
                </div>

                <h4 className="text-xl font-semibold w-fit">
                    Total: ₹{orderDetails.orderValue}
                </h4>
            </div>
        </div>
    );
};

export default SingleOrder;
