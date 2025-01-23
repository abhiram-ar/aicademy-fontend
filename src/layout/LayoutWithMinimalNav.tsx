import NavbarOnlyLogo from "@/components/extended/NavbarOnlyLogo";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";

const LayoutWithMinimalNav = () => {
    return (
        <>
            <NavbarOnlyLogo />
            <Outlet />
            <Footer />
        </>
    );
};

export default LayoutWithMinimalNav;
