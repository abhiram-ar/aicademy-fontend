import { Button } from "@/components/ui/button";
import React from "react";

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
    const categories: { displayName: string; value: string }[] = [
        {
            displayName: "All",
            value: "",
        },
        {
            displayName: "Web development",
            value: "webDevelopment",
        },
        {
            displayName: "AI/ML",
            value: "aiml",
        },
        {
            displayName: "Data science",
            value: "datascience",
        },
        {
            displayName: "Database",
            value: "database",
        },
        {
            displayName: "Personal deveopment",
            value: "personalDevelopment",
        },
        {
            displayName: "Health and Fitness",
            value: "healthAndWellness",
        },
        {
            displayName: "Editing",
            value: "editing",
        },
        {
            displayName: "other",
            value: "other",
        },
    ];

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
