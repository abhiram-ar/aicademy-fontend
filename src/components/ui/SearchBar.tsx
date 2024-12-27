import { Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

const SearchBar: React.FC<Props> = ({ query, setFilter = null }) => {
    const [searchValue, setSearchValue] = useState(query);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const searchRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (setFilter)
                return setFilter((prev) => ({ ...prev, search: searchValue }));
        }, 500);

        return () => clearTimeout(timer);
    }, [searchValue, setFilter]);

    // if navigated form explore focus on searrch elemenet
    useEffect(() => {
        if (pathname === "/explore" && searchRef.current)
            searchRef.current?.focus();
    }, [pathname]);

    return (
        <div className="flex border-2 border-black p-3 rounded-base w-full xlg:w-3/5 gap-2">
            <Search />
            <input
                type="text"
                value={searchValue}
                ref={searchRef}
                onClick={() => {
                    if (pathname !== "/explore") {
                        navigate("/explore");
                    }
                }}
                onChange={(e) => {
                    setSearchValue(e.target.value);

                    // // todo debounce this
                    // if (e.target.value === "" && setFilter) {
                    //     setFilter((prev) => ({ ...prev, search: "" }));
                    // }

                    // if (setFilter)
                    //     setFilter((value) => ({
                    //         ...value,
                    //         search: e.target.value,
                    //     }));
                }}
                className="w-full border-none outline-none"
            />
        </div>
    );
};

export default SearchBar;
