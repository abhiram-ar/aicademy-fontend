import React from "react";
import MainNavbar from "./MainNavbar";
import Footer from "@/components/Footer";
import { Outlet } from "react-router-dom";

const StandardLayout = () => {
    return (
        <>
            <MainNavbar query="" />
            <Outlet />
            <Footer />
        </>
    );
};

export default StandardLayout;
