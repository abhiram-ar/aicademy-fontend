
export interface ICoupon {
    _id: string;
    code: string;
    description: string;
    isActive: boolean;
    discount: number;
    expiryDate: string;
    usageLimit: number;
    usedBy: string[] | number[];
    maxDiscountAmount: number;
    minPurchaseAmount: number;
}
