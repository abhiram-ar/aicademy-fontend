export interface IChapter {
    chapterTitle: string;
    lessons: {
        lessonTitle: string;
        _id: string;
    }[];
    _id: string;
}
export interface IFullCourseData {
    thumbnail: {
        public_id: string;
        url: string;
    };
    _id: string;
    title: string;
    description: string;
    createdBy: {
        _id: string;
        legalName: string;
    };
    courseState: string;
    boughtCount: number;
    prerequisites: string[];
    demoVideoKey: { _id: string; transcodedVideoMasterFileKey: string };
    chapters: IChapter[];
    category?: string;
    estimatedPrice: number;
    level: string;
    price: number;
    benefits: string[];
    updatedAt: string; // ISO date string
    rating?: number;
    totalRatingCount: number;
}
export type IReview = {
    _id: string;
    courseId: string;
    createdBy: {
        profilePicture: {
            url: string;
        };

        firstName: string;
        lastName?: string;
    };
    createdAt: string;
    rating: number;
    review: string;
    updatedAt: string;
};
