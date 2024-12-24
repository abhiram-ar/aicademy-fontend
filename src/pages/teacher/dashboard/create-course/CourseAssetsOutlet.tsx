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

const CourseAssetsOutlet = () => {
    const { id } = useParams();
    const { data: content } = useGetAllCourseVideosQuery({
        courseId: id,
    });

    console.log(content);
    return (
        <>
            <Upload />
            <div className="w-[50rem] mx-auto">
                <Table>
                    <TableHeader>
                        <TableRow >
                            <TableHead className="text-center">#</TableHead>
                            <TableHead className="text-center">Video name</TableHead>
                            <TableHead className="text-center">Size</TableHead>
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
                                    <p className="text-sm mt-1 text-zinc-400 font-normal">Upload a video</p>
                                </div>
                                <TableCell></TableCell>
                            </TableRow>
                        )}
                        {content &&
                            content.courseVideos.map((video, index: number) => (
                                <TableRow key={video._id} className="bg-white">
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{video.displayName}</TableCell>
                                    <TableCell>
                                        {Math.round(
                                            video.originalFileSize /
                                                (1024 * 1024)
                                        )}{" "}
                                        MB
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export default CourseAssetsOutlet;
