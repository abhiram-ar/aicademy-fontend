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
