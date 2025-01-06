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
    page: number;
    totalPages: number;
    setFilter: React.Dispatch<
        React.SetStateAction<{
            search: string;
            page: number;
            limit: number;
        }>
    >;
};

const PaginationCoupon: React.FC<Props> = ({ totalPages, page, setFilter }) => {
    return (
        <Pagination className="mt-5">
            <PaginationContent>
                {page > 1 && (
                    <PaginationItem className="cursor-pointer">
                        <PaginationPrevious
                            className="bg-zinc-200"
                            onClick={() =>
                                setFilter((value) => ({
                                    ...value,
                                    page: page - 1,
                                }))
                            }
                        />
                    </PaginationItem>
                )}

                {Array.from({
                    length: totalPages,
                }).map((_, index) => (
                    <PaginationItem key={index + 1} className="cursor-pointer">
                        <PaginationLink
                            className={`bg-zinc-200  ${
                                index + 1 === page && "bg-black text-white"
                            }`}
                            onClick={() =>
                                setFilter((value) => ({
                                    ...value,
                                    page: index + 1,
                                }))
                            }
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {page < totalPages && (
                    <PaginationItem className="cursor-pointer">
                        <PaginationNext
                            className="bg-zinc-200"
                            onClick={() =>
                                setFilter((value) => ({
                                    ...value,
                                    page: page + 1,
                                }))
                            }
                        />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationCoupon;
