import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
    search: string;
    setFilter: React.Dispatch<
        React.SetStateAction<{
            search: string;
            page: number;
            limit: number;
        }>
    >;
};

const SearchField: React.FC<Props> = ({ search, setFilter }) => {
    const [query, setQuery] = useState(search);

    useEffect(() => {
        const timer = setTimeout(
            () => setFilter((value) => ({ ...value, search: query, page: 1 })),
            500
        );
        return () => clearTimeout(timer);
    }, [query, setFilter]);

    return (
        <div className="flex  justify-center items-center border-2 border-black rounded-base px-2  py-2 gap-2 m-2 bg-white w-full mx-auto">
            <Search />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="search courses"
                className="border-none outline-none w-full"
            />
        </div>
    );
};

export default SearchField;
