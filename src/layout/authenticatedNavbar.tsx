import CartButton from "@/components/extended/CartButton";
import Navbar from "../components/base/Navbar";
import SearchBar from "../components/ui/SearchBar";
import MylearningButton from "@/components/extended/MyLearningButton";
import NotificationButton from "@/components/extended/NotificationButton";
import UserButton from "@/components/extended/UserButton";

const AutheicatedNavbar = () => {
    return (
        <>
            <Navbar>
                <h1 className="text-3xl font-bold">AIcademy</h1>
                <div className="w-full mx-10 ms-16">
                    <SearchBar />
                </div>
                <div className=" flex gap-3">
                    <MylearningButton />
                    <CartButton />
                    <NotificationButton />
                    <UserButton />
                </div>
            </Navbar>
        </>
    );
};

export default AutheicatedNavbar;
