import MainNavbar from "@/layout/MainNavbar";
import {
    useGetCartQuery,
    useMoveToWishlistMutation,
    useRemoveFromCartMutation,
} from "./cartApiSlice";
import CourseCardLong from "../explore/CourseCardLong";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ICourse } from "../explore/ExplorePage";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Link } from "react-router-dom";
import Checkout from "./Checkout";
import { Toaster } from "react-hot-toast";
import Wishlist from "./WishList";

const CartPage = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const { data: cartData, refetch } = useGetCartQuery(undefined, {
        skip: !user,
    });
    const [removeFromCart] = useRemoveFromCartMutation();
    const [moveToWishlist] = useMoveToWishlistMutation();

    const handleRemoveFromCart = async (courseId: string) => {
        try {
            await removeFromCart({
                courseId,
            }).unwrap();
        } catch (error) {
            console.error(`error while removing cart`, error);
        }
    };

    const handleMoveToWishList = async (courseId: string) => {
        try {
            await moveToWishlist({
                courseId,
            }).unwrap();
        } catch (error) {
            console.error(`error while moving cart`, error);
        }
    };

    let totalWithoutCouponDiscount;
    if (cartData) {
        totalWithoutCouponDiscount = cartData.cart.reduce(
            (sum: number, course: ICourse) => sum + course.price,
            0
        );
    }

    console.log("cartData", cartData);

    return (
        <div>
            <MainNavbar query="" />
            <Toaster />
            <div className="w-full min-h-screen bg-[#fffbee] py-10">
                <div className="w-9/12 border mx-auto">
                    <h2 className="font-semibold text-xl bg-zinc-300 rounded-base w-fit px-2">
                        cart
                    </h2>

                    {/* cart and checkout contaner */}
                    <div className="grid grid-cols-12 mt-3 gap-10">
                        <div className="col-span-8">
                            {cartData && cartData.length > 0 ? (
                                cartData.cart.map((course: ICourse) => (
                                    <div
                                        key={course._id}
                                        className="bg-slate-100 mb-5 rounded-base font-publicSans"
                                    >
                                        <Link
                                            to={`/explore/course/${course._id}`}
                                        >
                                            <div className="relative z-20">
                                                <CourseCardLong
                                                    courseDetails={course}
                                                />
                                            </div>
                                        </Link>
                                        <div className="flex justify-end gap-5 -mt-3 p-2 border border-t-0 border-slate-300 rounded-b-base text-zinc-600 px-5 font-medium relative z-10">
                                            <button
                                                onClick={() =>
                                                    handleMoveToWishList(
                                                        course._id
                                                    )
                                                }
                                                className="hover:underline hover:text-zinc-800"
                                            >
                                                Move to wishlist
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleRemoveFromCart(
                                                        course._id
                                                    )
                                                }
                                                className="hover:underline hover:text-zinc-800"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-slate-200 p-10 flex flex-col gap-2 justify-center items-center rounded-base text-zinc-800">
                                    <AddShoppingCartOutlinedIcon fontSize="large" />
                                    <p className="font-medium text-xl">
                                        Cart is empty!
                                    </p>{" "}
                                    {/* <p className="text-zinc-500 underline">add course to cart</p> */}
                                </div>
                            )}
                        </div>

                        <Checkout
                            totalAmounts={cartData?.totalAmount}
                            totalCourses={cartData?.length}
                            couponDetails={cartData?.coupon}
                            totalWithoutCouponDiscount={
                                totalWithoutCouponDiscount
                            }
                            refetchCart={refetch}
                        />
                    </div>

                    {/* wishlist container */}
                    <hr className="my-10" />
                    <div>
                        <Wishlist />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
