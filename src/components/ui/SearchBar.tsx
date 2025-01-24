import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
    query: string;
    setFilter: React.Dispatch<
        React.SetStateAction<{
            search: string;
            category: string;
            level: string;
            minPrice: string;
            maxPrice: string;
            sortBy: string;
            sortOrder: number;
            page: number;
            limit: number;
        }>
    >;
};

const SearchBar: React.FC<Props> = ({ query, setFilter }) => {
    const [searchValue, setSearchValue] = useState(query);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (setFilter)
                return setFilter((prev) => ({
                    ...prev,
                    search: searchValue,
                    page: 1,
                }));
        }, 500);

        return () => clearTimeout(timer);
    }, [searchValue, setFilter]);

    //reset the filter to default state when going to another page
    useEffect(() => {
        if (pathname !== "/explore") {
            setFilter({
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
        }
    }, [pathname, setFilter]);

    return (
        <div className="flex border-2 border-black p-3 rounded-base w-full xlg:w-3/5 gap-2">
            <Search />
            <input
                type="text"
                value={searchValue}
                onClick={() => {
                    if (pathname !== "/explore") {
                        navigate("/explore");
                    }
                }}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
                className="w-full border-none outline-none"
            />
        </div>
    );
};

export default SearchBar;
