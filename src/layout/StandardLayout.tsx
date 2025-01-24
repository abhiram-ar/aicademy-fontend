import MainNavbar from "./MainNavbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const StandardLayout = () => {
    const [filter, setFilter] = useState({
        search: "",
        category: "",
        level: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "price",
        sortOrder: -1,
        page: 1,
        limit: 5,
    });

    return (
        <>
            <MainNavbar query={filter.search} setFilter={setFilter} />
            <Outlet context={{ filter, setFilter }} />
            <Footer />
        </>
    );
};

export default StandardLayout;
