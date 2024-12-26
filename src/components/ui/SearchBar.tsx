import { Search } from "lucide-react";
import React, { useDeferredValue, useState } from "react";

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
            page: string;
            limit: number;
        }>
    >;
};

const SearchBar: React.FC<Props> = ({ query, setFilter }) => {
    const [searchValue, setSearchValue] = useState(query);
    const deferedQuery = useDeferredValue(searchValue);
    return (
        <div className="flex border-2 border-black p-3 rounded-base w-full xlg:w-3/5 gap-2">
            <Search />
            <input
                type="text"
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);

                    // todo debounce this
                    setFilter((value) => ({ ...value, search: deferedQuery }));
                }}
                className="w-full border-none outline-none"
            />
        </div>
    );
};

export default SearchBar;
