export type FormData = {
    title: string;
    description: string;
    createdBy: string;
    courseState: "draft" | "published" | "unpublished";
    price?: number;
    estimatedPrice?: number;
    thumbnail?: {
        public_id: string;
        url: string;
    };
    category?: string;
    level?: "beginner" | "intermediate" | "advanced";
    benefits: { value: string; }[];
    prerequisites: { value: string; }[];
    demoVideoKey: string;
};
