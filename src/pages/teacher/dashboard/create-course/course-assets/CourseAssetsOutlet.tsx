import { useGetAllCourseVideosQuery } from "@/redux/features/teacher/courseCreationAPIs";
import Upload from "./Upload";
import { useParams } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";

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
}

const CourseAssetsOutlet = () => {
    const { id } = useParams();
    const { data: content, refetch: refetchCourseList } =
        useGetAllCourseVideosQuery({
            courseId: id,
        });

    // polling every 30s - average time to process a video
    useEffect(() => {
        let interval: string | number | NodeJS.Timeout | undefined;
        if (content) {
            interval = setInterval(refetchCourseList, 30000);
        }
        return () => clearInterval(interval);
    }, [content, refetchCourseList]);

    console.log(content);
    return (
        <>
            <Upload />
            <div className="w-[50rem] mx-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Video name</TableHead>
                            <TableHead className="w-20">Size</TableHead>
                            <TableHead className="w-24">AI status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="w-full">
                        {content && content.courseVideos.length === 0 && (
                            <TableRow className="bg-white">
                                <TableCell></TableCell>
                                <div className="flex flex-col justify-center items-center py-10">
                                    <p className="text-xl font-medium text-zinc-400">
                                        This course does not contain any assets
                                    </p>
                                    <p className="text-sm mt-1 text-zinc-400 font-normal">
                                        Upload a video
                                    </p>
                                </div>
                                <TableCell></TableCell>
                            </TableRow>
                        )}
                        {content &&
                            content.courseVideos.map(
                                (video: Ivideo, index: number) => (
                                    <TableRow
                                        key={video._id}
                                        className="bg-white"
                                    >
                                        <TableCell>{index + 1}</TableCell>

                                        {/* display name */}
                                        <TableCell>
                                            {video.displayName}
                                        </TableCell>

                                        {/* size */}
                                        <TableCell>
                                            {Math.round(
                                                video.originalFileSize /
                                                    (1024 * 1024)
                                            )}{" "}
                                            MB
                                        </TableCell>

                                        {/* ai processing status */}
                                        <TableCell
                                            className={`flex ${
                                                video.aiStatus ===
                                                    "processing" &&
                                                "text-amber-500"
                                            } ${
                                                video.aiStatus === "ready" &&
                                                "text-green-500"
                                            } ${
                                                video.aiStatus === "failed" &&
                                                "text-red-500"
                                            }`}
                                        >
                                            {video.aiStatus}
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default CourseAssetsOutlet;
