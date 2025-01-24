export interface Ivideo {
    _id: string;
    uploadedBy: string;
    courseId: string;
    displayName: string;
    key: string;
    originalFileSize: number;
    originalFileType: number;
    aiStatus: "processing" | "ready" | "failed";
    transcriptId?: string;
    transcodingStatus: "processing" | "completed" | "failed";
    transcodedVideoMasterFileKey?: string;
}
export interface ICourse {
    _id: string;
    title: string;
    description: string;
    createdBy: string; // Reference to the Teacher model
    courseState?: "draft" | "published" | "unpublished";
    price?: number;
    estimatedPrice?: number;
    thumbnail?: {
        s3Key: string;
        public_id: string;
        url: string;
    };
    demoVideoKey: string;
    rating?: number;
    boughtCount?: number;
    category?: string;
    level?: "beginner" | "intermediate" | "advanced";
    benefits?: string[];
    prerequisites?: string[];
    chapters?: Array<{
        chapterTitle: string;
        lessons?: Array<{
            lessonTitle?: string;
            videoKey?: string;
            videoURL?: string;
            videoDuration?: number;
        }>;
    }>;
}
