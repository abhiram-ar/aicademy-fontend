import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Props {
    search: string;
    setFilter: React.Dispatch<
        React.SetStateAction<{
            search: string;
            limit: number;
            page: number;
        }>
    >;
}

const SearchUser: React.FC<Props> = ({ search, setFilter }) => {
    const [query, setQuery] = useState(search);

    useEffect(() => {
        const timer = setTimeout(
            () => setFilter((value) => ({ ...value, search: query, page: 1 })),
            1000
        );

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="flex  justify-center items-center border-2 border-black rounded-base px-2  py-2 gap-2 m-2">
            <Search />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-none outline-none w-full"
            />
        </div>
    );
};

export default SearchUser;
