import { Button } from "@/components/ui/button";
import React from "react";
import { categories } from "./categories";

type Props = {
    filter: {
        search: string;
        category: string;
        level: string;
        minPrice: string;
        maxPrice: string;
        sortBy: string;
        sortOrder: number;
        page: number;
        limit: number;
    };
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

const FIlterCategoryNav: React.FC<Props> = ({ filter, setFilter }) => {

    return (
        <div className="bg-white flex justify-center items-center gap-2 p-5 border-b-4 border-black -mt-1 relative z-30 ">
            {categories.map((category, index) => (
                <Button
                    key={index}
                    variant="reverse"
                    className={`px-5 py-0 text-lg  ${
                        filter.category === category.value
                            ? " border border-black rounded-base bg-yellow-300"
                            : " bg-white border-0 hover:border hover:border-black"
                    }`}
                    onClick={() =>
                        setFilter((prev) => ({
                            ...prev,
                            category: category.value,
                            page: 1,
                        }))
                    }
                >
                    {String(category.displayName)}
                </Button>
            ))}
        </div>
    );
};

export default FIlterCategoryNav;
