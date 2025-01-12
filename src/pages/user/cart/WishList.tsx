import { Link } from "react-router-dom";
import CourseCardLong from "../explore/CourseCardLong";
import {
    useGetWishlistQuery,
    useMoveToCartMutation,
    useRemoveFromWishlistMutation,
} from "../wishlist/wishlistApiSlice";
import { ICourse } from "../explore/ExplorePage";

const Wishlist = () => {
    const { data } = useGetWishlistQuery({});
    const [removeFromWishlist] = useRemoveFromWishlistMutation();
    const [moveToCart] = useMoveToCartMutation();

    const handleRemoveFromWishlist = async (courseId: string) => {
        try {
            await removeFromWishlist({ courseId });
        } catch (error) {
            console.error("error while removing from wishlist", error);
        }
    };

    const handleMoveToCart = async (courseId: string) => {
        try {
            await moveToCart({ courseId });
        } catch (error) {
            console.error(
                "error while moving course from wishlist to cart",
                error
            );
        }
    };

    return (
        <>
            <h2 className="font-semibold text-xl bg-zinc-300 rounded-base w-fit px-2">
                wishlist
            </h2>
            <div className="grid grid-cols-12 mt-3 gap-10">
                <div className="col-span-8">
                    {data && data.length > 0 ? (
                        data.wishlist.map((course: ICourse) => (
                            <div
                                key={course._id}
                                className="bg-slate-100 mb-5 rounded-base font-publicSans"
                            >
                                <Link to={`/explore/course/${course._id}`}>
                                    <div className="relative z-20">
                                        <CourseCardLong
                                            courseDetails={course}
                                        />
                                    </div>
                                </Link>
                                <div className="flex justify-end gap-5 -mt-3 p-2 border border-t-0 border-slate-300 rounded-b-base text-zinc-600 px-5 font-medium relative z-10">
                                    <button
                                        onClick={() =>
                                            handleMoveToCart(course._id)
                                        }
                                        className="hover:underline hover:text-zinc-800"
                                    >
                                        Move to Cart
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleRemoveFromWishlist(course._id)
                                        }
                                        className="hover:underline hover:text-zinc-800"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
};

export default Wishlist;
