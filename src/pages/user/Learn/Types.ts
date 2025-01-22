export interface IVideo {
    aiStatus: "processing" | "ready" | "failed";
    transcodedVideoMasterFileKey: string;
    key: string;
    _id: string;
}

export interface ILesson {
    lessonTitle: string;
    videoKey: IVideo;
    _id: string;
}

export interface IChapter {
    chapterTitle: string;
    lessons: ILesson[];
    _id: string;
}

export interface ICourseContent {
    chapters: IChapter[];
    title: string;
    description: string;
}
export interface IMessage {
    role: "ai" | "user";
    message: string;
}
