import React from "react";

export interface ICourse {
    _id: string;
    title: string;
    description: string;
    createdBy: {
        firstName: string;
        lastName: string;
        legalName: string;
    };
    price: number;
    estimatedPrice: number;
    thumbnail: { public_id: string; url: string; };
    rating?: number;
    boughtCount: number;
    category: string;
    level: "beginner" | "intermediate" | "advanced";
    pages: number;
    totalRatingCount: number;
}export type Props = {
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

