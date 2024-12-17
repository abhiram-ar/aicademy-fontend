import { useDispatch, useSelector } from "react-redux";
import demopic from "./../../assets/studentDemo.png";
import { RootState } from "@/redux/store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutMutation } from "@/redux/features/auth/userAuthAPIs";
import { logout } from "./../../redux/features/auth/authSlice";

const UserInfoDropdown = () => {
    const username = useSelector<RootState, string | undefined>(
        (state) => state.auth.user?.username
    );

    const [logoutApi] = useLogoutMutation();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        console.log(`trying to logout`);

        try {
            await logoutApi({}).unwrap();
            dispatch(logout());
        } catch (error) {
            console.log(`error while logging out`, error);
        }
    };

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                    <div className="bg-main overflow-hidden outline-none size-12 rounded-base shadow-light border-2 border-border hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none  ">
                        <img
                            src={demopic}
                            className="w-fill origin-top scale-150 border-0 focus:outline-0"
                        />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="me-5 mt-2">
                    <DropdownMenuLabel>
                        {username ?? (
                            <p className="text-zinc-600">loading...</p>
                        )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>My account</DropdownMenuItem>
                    <DropdownMenuItem>Orders</DropdownMenuItem>
                    <DropdownMenuItem>Help</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                        logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default UserInfoDropdown;
