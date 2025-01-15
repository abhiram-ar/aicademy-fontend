import NavbarOnlyLogo from "@/components/extended/NavbarOnlyLogo";
import Footer from "@/components/Footer";
import { logout } from "@/redux/features/auth/authSlice";
import { useLogoutMutation } from "@/redux/features/auth/userAuthAPIs";
import { useDispatch } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const UserProfileLayout = () => {
    const [logoutApi] = useLogoutMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        console.log(`trying to logout`);

        try {
            await logoutApi({}).unwrap();
            dispatch(logout());
            navigate("/");
        } catch (error) {
            console.log(`error while logging out`, error);
        }
    };

    return (
        <div>
            <NavbarOnlyLogo />

            {/* body */}
            <div className="bg-paperYellow w-full min-h-screen py-10">
                {/* content */}
                <div className="w-9/12 mx-auto grid grid-cols-4">
                    {/* sidebar */}
                    <div className="bg-white grid  border-2 border-black w-fit h-fit rounded-base overflow-hidden">
                        <p className="font-medium px-10 py-2 border-b-2 border-black bg-zinc-600 text-darkText">
                            Account
                        </p>
                        <NavLink
                            to="/user/profile"
                            className={({ isActive }) =>
                                `px-10 py-2 border-b border-black hover:bg-slate-300 ${
                                    isActive && "bg-slate-200"
                                }`
                            }
                        >
                            Profile
                        </NavLink>
                        <NavLink
                            to="/user/changePassword"
                            className={({ isActive }) =>
                                `px-10 py-2 border-b border-black hover:bg-slate-300 ${
                                    isActive && "bg-slate-200"
                                }`
                            }
                        >
                            Change password
                        </NavLink>
                        <button
                            onClick={handleLogout}
                            className="px-10 py-2 border-b border-black hover:bg-slate-300 text-left"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="col-span-3 border">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfileLayout;
