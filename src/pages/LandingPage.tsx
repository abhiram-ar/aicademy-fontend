import AutheicatedNavbar from "@/layout/AuthenticatedNavbar";
import UnautheicatedNavbar from "@/layout/UnautheticatedNavbar";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const LandingPage = () => {
    const isLoggedIn = useSelector<RootState>((state) =>
        state.auth.user?.role === "user" ? true : false
    );

    return <>{isLoggedIn ? <AutheicatedNavbar /> : <UnautheicatedNavbar />}</>;
};

export default LandingPage;
