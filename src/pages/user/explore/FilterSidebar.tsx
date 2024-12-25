import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const FilterSidebar = () => {
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
                    defaultValue="default"
                    className="font-normal ps-3 my-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="free" id="r2" />
                        <Label htmlFor="r2">Free</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="r1" />
                        <Label htmlFor="r1">0-200 ₹</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="advanced" id="r3" />
                        <Label htmlFor="r3">201 - 500 ₹</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="advanced" id="r3" />
                        <Label htmlFor="r3">501 - 1000 ₹</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="advanced" id="r3" />
                        <Label htmlFor="r3">1000₹ above</Label>
                    </div>
                </RadioGroup>
            </div>

            <hr className="border-black" />

            <div className="px-5 py-3 pb-5">
                <h4 className="text-text font-medium font-publicSans">Level</h4>
                <RadioGroup
                    defaultValue="beginner"
                    className="font-normal ps-3 mt-2"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="beginner" id="r2" />
                        <Label htmlFor="r2">beginner</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="intermediate" id="r1" />
                        <Label htmlFor="r1">intermediate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="advanced" id="r3" />
                        <Label htmlFor="r3">advanced</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    );
};

export default FilterSidebar;
