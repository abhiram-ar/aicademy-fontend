import React, { useRef, useState } from "react";
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
        minPrice: "",
        maxPrice: "",
    },
];

const FilterSidebar: React.FC<Props> = ({ filter, setFilter }) => {
    const [customMinPrice, setCustomMinPrice] = useState("");
    const [customMaxPrice, setCustomMaxPrice] = useState("");
    const customPriceRef = useRef<HTMLDivElement>(null);

    const handleCustomPriceSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        setFilter((prev) => ({
            ...prev,
            minPrice: String(form.minPrice.value as HTMLInputElement),
            maxPrice: String(form.maxPrice.value as HTMLInputElement),
        }));
    };

    return (
        <div className="bg-white border border-black rounded-base w-64 mt-5">
            <h3 className="text-text  font-publicSans font-medium px-5 pt-3 pb-2">
                Filter
            </h3>

            <hr className="border-black" />

            {/* price filter */}
            <div className="px-5 py-2">
                <h4 className="text-text  font-publicSans font-medium">
                    Price
                </h4>
                <RadioGroup
                    onValueChange={(value) => {
                        const filter = priceFilter.find(
                            (filter) => filter.value === value
                        );

                        setFilter((prev) => ({
                            ...prev,
                            minPrice: String(filter?.minPrice),
                            maxPrice: String(filter?.maxPrice),
                        }));
                    }}
                    defaultValue=""
                    className="font-normal ps-3 my-2"
                >
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="" id="p0" />
                        <Label htmlFor="p0">none</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="free" id="p1" />
                        <Label htmlFor="p1">Free</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="under500" id="p2" />
                        <Label htmlFor="p2">Under 500 ₹</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="under1000" id="p3" />
                        <Label htmlFor="p3">Under 1000 ₹</Label>
                    </div>

                    <div>
                        <div
                            className="flex items-center space-x-2"
                            ref={customPriceRef}
                        >
                            <RadioGroupItem value="custom" id="p4" />
                            <Label htmlFor="p4">Custom</Label>
                        </div>
                        {(
                            customPriceRef.current
                                ?.firstChild as HTMLButtonElement
                        )?.dataset?.state === "checked" && (
                            <form
                                className="ps-7"
                                onSubmit={(e) => handleCustomPriceSubmit(e)}
                            >
                                <input
                                    type="number"
                                    min={0}
                                    max={100000}
                                    name="minPrice"
                                    value={customMinPrice}
                                    onChange={(e) =>
                                        setCustomMinPrice(e.target.value)
                                    }
                                    placeholder="min"
                                    className="input-neo w-full border bg-slate-100 h-8 "
                                />
                                <input
                                    type="number"
                                    min={0}
                                    max={100000}
                                    name="maxPrice"
                                    value={customMaxPrice}
                                    onChange={(e) =>
                                        setCustomMaxPrice(e.target.value)
                                    }
                                    placeholder="max"
                                    className="input-neo w-full border bg-slate-100 h-8"
                                />
                                <button
                                    type="submit"
                                    className="border border-slate-500 bg-blue-200 px-5 py-1 block mt-1 rounded-base mx-auto hover:bg-blue-300"
                                >
                                    Go
                                </button>
                            </form>
                        )}
                    </div>
                </RadioGroup>
            </div>

            <hr className="border-black" />

            {/* level filter */}
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
                        <Label htmlFor="l1">All</Label>
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
