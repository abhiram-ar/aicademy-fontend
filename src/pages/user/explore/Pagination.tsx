import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import React from "react";

type Props = {
    pages: number;
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

const PaginationExplore: React.FC<Props> = ({ filter, setFilter, pages }) => {
    return (
        <Pagination>
            <PaginationContent>
                {filter.page > 1 && (
                    <PaginationItem className="cursor-pointer">
                        <PaginationPrevious
                            onClick={() => {
                                setFilter((value) => ({
                                    ...value,
                                    page: filter.page - 1,
                                }));
                                window.scrollTo(0, 0);
                            }}
                        />
                    </PaginationItem>
                )}

                {pages &&
                    Array.from({
                        length: pages,
                    }).map((_, index) => (
                        <PaginationItem
                            key={index + 1}
                            className="cursor-pointer"
                        >
                            <PaginationLink
                                className={`${
                                    index + 1 === filter.page &&
                                    "bg-black text-white"
                                }`}
                                onClick={() => {
                                    setFilter((value) => ({
                                        ...value,
                                        page: index + 1,
                                    }));
                                    window.scrollTo(0, 0);
                                }}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                {pages && filter.page < pages && (
                    <PaginationItem className="cursor-pointer">
                        <PaginationNext
                            onClick={() => {
                                setFilter((value) => ({
                                    ...value,
                                    page: filter.page + 1,
                                }));
                                window.scrollTo(0, 0);
                            }}
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationExplore;
