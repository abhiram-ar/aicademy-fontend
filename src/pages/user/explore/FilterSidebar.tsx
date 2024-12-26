import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
    filter: {
        search: string;
        category: string;
        level: string;
        minPrice: string;
        maxPrice: string;
        sortBy: string;
        sortOrder: number;
        page: string;
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
            page: string;
            limit: number;
        }>
    >;
};

const priceFilter: {
    value: string;
    minPrice?: number | "";
    maxPrice?: number | "";
}[] = [
    {
        value: "",
        minPrice: "",
        maxPrice: "",
    },
    {
        value: "free",
        minPrice: "",
        maxPrice: 0,
    },
    {
        value: "under500",
        minPrice: "",
        maxPrice: 500,
    },
    {
        value: "under1000",
        minPrice: "",
        maxPrice: 1000,
    },
    {
        value: "custom",
    },
];

const FilterSidebar: React.FC<Props> = ({ filter, setFilter }) => {
    const [customMinPrice, setCustomMinPrice] = useState("");
    const [customMaxPrice, setCustomMaxPrice] = useState("");


    return (
        <div className="bg-white border border-black rounded-base w-64 mt-5">
            <h3 className="text-text  font-publicSans font-medium px-5 pt-3 pb-2">
                Filter
            </h3>

            <hr className="border-black" />

            <div className="px-5 py-2">
                <h4 className="text-text  font-publicSans font-medium">
                    Price
                </h4>
                <RadioGroup
                    onValueChange={(value) => {
                        const filter = priceFilter.find(
                            (filter) => filter.value === value
                        );
                        if (filter?.value !== "custom") {
                            setFilter((prev) => ({
                                ...prev,
                                minPrice: String(filter?.minPrice),
                                maxPrice: String(filter?.maxPrice),
                            }));
                        } else {
                            setFilter((prev) => ({
                                ...prev,
                                maxPrice: String(customMaxPrice),
                                minPrice: String(customMinPrice),
                            }));
                        }
                    }}
                    defaultValue=""
                    className="font-normal ps-3 my-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="free" id="r1" />
                        <Label htmlFor="r1">Free</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="under500" id="r3" />
                        <Label htmlFor="r3">Under 500 ₹</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="under1000" id="r3" />
                        <Label htmlFor="r3">Under 1000 ₹</Label>
                    </div>

                    <div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="custom" id="r3" />
                            <Label htmlFor="r3">Custom</Label>
                        </div>
                        <div className="ps-7">
                            <input
                                type="number"
                                min={0}
                                value={customMinPrice}
                                onChange={(e) =>
                                    setCustomMinPrice(e.target.value)
                                }
                                placeholder="min"
                                className="input-neo w-full border bg-slate-100 h-8 "
                            />
                            <input
                                type="number"
                                max={10000}
                                value={customMaxPrice}
                                onChange={(e) =>
                                    setCustomMaxPrice(e.target.value)
                                }
                                placeholder="max"
                                className="input-neo w-full border bg-slate-100 h-8"
                            />
                        </div>
                    </div>
                </RadioGroup>
            </div>

            <hr className="border-black" />

            <div className="px-5 py-3 pb-5">
                <h4 className="text-text font-medium font-publicSans">Level</h4>
                <RadioGroup
                    defaultValue={filter.level}
                    className="font-normal ps-3 mt-2"
                    onValueChange={(value) =>
                        setFilter((prev) => ({ ...prev, level: value }))
                    }
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="l1" />
                        <Label htmlFor="l1">Free</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="beginner" id="l2" />
                        <Label htmlFor="l2">Beginner</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="intermediate" id="l3" />
                        <Label htmlFor="l3">Intermediate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="advanced" id="l4" />
                        <Label htmlFor="l4">Advanced</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
};

export default FilterSidebar;
