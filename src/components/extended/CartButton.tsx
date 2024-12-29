import { useGetCartQuery } from "@/pages/user/cart/cartApiSlice";
import { Button } from "../ui/button";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const CartButton = () => {
    const { data: cartData } = useGetCartQuery({});
    console.log(`cartdeta`, cartData);
    return (
        <Button className="p-3 bg-white relative" size="md">
            {cartData 
            // && cartData.length > 0 
            && (
                <div className="absolute -top-2 -right-2 bg-red-500 border border-black text-darkText size-5  rounded-full  text-xs font-publicSans p-0.5">
                    {cartData.length}
                </div>
            )}
            <ShoppingCartOutlinedIcon />
        </Button>
    );
};

export default CartButton;
