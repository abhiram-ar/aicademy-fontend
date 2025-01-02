import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React from "react";

type Props = {
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

const sortOptions: {
    displayName: string;
    value: string;
    sortOrder: -1 | 1;
    sortBy: "price" | "rating" | "createdAt";
}[] = [
    {
        displayName: "Rating",
        value: "rating",
        sortOrder: -1,
        sortBy: "rating",
    },
    {
        displayName: "New",
        value: "new",
        sortOrder: -1,
        sortBy: "createdAt",
    },
    {
        displayName: "Price: High to low",
        value: "phl",
        sortOrder: -1,
        sortBy: "price",
    },
    {
        displayName: "Price: Low to High",
        value: "plh",
        sortOrder: 1,
        sortBy: "price",
    },
];

const SortDropDown: React.FC<Props> = ({ setFilter }) => {
    const handleSortSelectChange = (value: string) => {
        const sortOption = sortOptions.find(
            (sortOption) => sortOption.value === value
        );
        if (sortOption)
            setFilter((prev) => ({
                ...prev,
                sortBy: sortOption.sortBy,
                sortOrder: sortOption.sortOrder,
                page: 1,
            }));
    };

    return (
        <Select
            defaultValue=""
            onValueChange={(value) => handleSortSelectChange(value)}
        >
            <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="sort by" />
            </SelectTrigger>
            <SelectContent className="bg-white">
                <SelectGroup>
                    {sortOptions.map((sortOption, index) => (
                        <SelectItem key={index} value={sortOption.value}>
                            {sortOption.displayName}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SortDropDown;
