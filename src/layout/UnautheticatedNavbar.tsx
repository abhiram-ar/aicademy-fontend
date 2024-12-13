import Navbar from "../components/base/Navbar";
import SearchBar from "../components/ui/SearchBar";
import TeachButton from "../components/extended/TeachButton";
import LoginButton from "@/components/extended/LoginButton";
import SignupButton from "@/components/extended/SignupButton";

const UnautheicatedNavbar = () => {
    return (
        <>
            <Navbar>
                <h1 className="text-3xl font-bold">AIcademy</h1>
                <div className="w-full mx-10 ms-16">
                    <SearchBar />
                </div>
                <div className="flex gap-3">
                    <TeachButton />
                    <LoginButton />
                    <SignupButton />
                </div>
            </Navbar>
        </>
    );
};

export default UnautheicatedNavbar;
