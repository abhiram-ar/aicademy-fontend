import { Search } from "lucide-react";

const SearchBar = () => {
    return (
    <div className="flex border-2 border-black p-3  rounded-base w-3/5">
            <Search/>
            <input type="text" />
        </div>
    );
};

export default SearchBar