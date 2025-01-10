import React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const FilterRangeDropDown = ({
    setFilter,
}: {
    setFilter: (value: "monthly" | "daily") => void;
}) => {
    return (
        <div>
            <Select
                onValueChange={(value: "monthly" | "daily") => setFilter(value)}
            >
                <SelectTrigger
                    defaultValue="monthly"
                    className="w-[180px] bg-slate-100 border-slate-200"
                >
                    <SelectValue placeholder="monthly" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-100 border-slate-200">
                    <SelectGroup>
                        <SelectItem
                            value="monthly"
                            className=" hover:border-slate-300 hover:bg-zinc-300 outline-none border-none"
                        >
                            Monthly
                        </SelectItem>
                        <SelectItem
                            className=" hover:border-slate-300 hover:bg-zinc-300 outline-none border-none"
                            value="daily"
                        >
                            Daily
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default FilterRangeDropDown;
