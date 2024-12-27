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
import React from "react";
import AIcademyLogo from "@/components/base/AIcademyLogo";

type Props = {
    query: string;
    setFilter?: React.Dispatch<
        React.SetStateAction<{
            search: string;
            category: string;
            level: string;
            minPrice: string;
            maxPrice: string;
            sortBy: string;
            sortOrder: number;
            page: string;
            limit: number;
        }>
    >;
};

const MainNavbar: React.FC<Props> = ({ query, setFilter }) => {
    const isLoggedIn = useSelector<RootState>((state) =>
        state.auth.user?.role === "user" ? true : false
    );
    return (
        <>
            <Navbar>
                <AIcademyLogo />
                <div className="w-full mx-10 ms-16">
                    <SearchBar query={query} setFilter={setFilter} />
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
