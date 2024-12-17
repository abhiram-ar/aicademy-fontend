import Navbar from "../components/base/Navbar";
import SearchBar from "../components/ui/SearchBar";
import TeachButton from "../components/extended/TeachButton";
import LoginButton from "@/components/extended/LoginButton";
import SignupButton from "@/components/extended/SignupButton";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import MylearningButton from "@/components/extended/MyLearningButton";
import CartButton from "@/components/extended/CartButton";
import UserInfoDropdown from "@/components/extended/UserInfoDropdown";
import NotificationButton from "@/components/extended/NotificationButton";

const MainNavbar = () => {
    const isLoggedIn = useSelector<RootState>((state) =>
        state.auth.user?.role === "user" ? true : false
    );
    return (
        <>
            <Navbar>
                <h1 className="text-3xl font-bold">AIcademy</h1>
                <div className="w-full mx-10 ms-16">
                    <SearchBar />
                </div>
                <div className="flex gap-3">
                    {isLoggedIn ? (
                        <>
                            <MylearningButton />
                            <CartButton />
                            <NotificationButton />
                            <UserInfoDropdown />
                        </>
                    ) : (
                        <>
                            <TeachButton />
                            <LoginButton />
                            <SignupButton />
                        </>
                    )}
                </div>
            </Navbar>
        </>
    );
};

export default MainNavbar;
