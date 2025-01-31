export interface IChapter {
    chapterTitle: string;
    lessons: {
        lessonTitle: string;
        _id: string;
    }[];
    _id: string;
}
export interface IFullCourseData {
    totalRatingCount: number | undefined;
    thumbnail?: {
        url: string | undefined;
        s3Key: string;
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
    demoVideos: string;
    chapters: IChapter[];
    category: string;
    estimatedPrice: number;
    level: string;
    price: number;
    benefits: string[];
    updatedAt: string; // ISO date string
    rating?: number;
    demoVideoKey: { transcodedVideoMasterFileKey: string };
}
