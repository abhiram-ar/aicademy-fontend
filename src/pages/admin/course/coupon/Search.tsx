import { Search } from "lucide-react";
import React from "react";

const SearchField = () => {
    return (
        <div className="flex  justify-center items-center border-2 border-black rounded-base px-2  py-2 gap-2 m-2 bg-white w-full">
            <Search />
            <input
                type="text"
                // value={query}
                // onChange={(e) => setQuery(e.target.value)}
                placeholder="search coupons"
                className="border-none outline-none w-full"
            />
        </div>
    );
};

export default SearchField;
