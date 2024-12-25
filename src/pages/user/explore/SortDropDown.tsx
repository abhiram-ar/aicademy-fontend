import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SortDropDown = () => {
    return (
        <Select>
            <SelectTrigger className="w-[180px] bg-white">
                <SelectValue placeholder="sort by" />
            </SelectTrigger>
            <SelectContent className="bg-white">
                <SelectGroup>
                    <SelectItem value="apple">Price: High to low</SelectItem>
                    <SelectItem value="banana">Price: Low to High</SelectItem>
                    <SelectItem value="blueberry">Rating</SelectItem>
                    <SelectItem value="grapes">New</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SortDropDown;
