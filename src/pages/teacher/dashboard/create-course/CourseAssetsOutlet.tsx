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
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Video name</TableHead>
                            <TableHead className="">Size</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {content &&
                            content.courseVideos.map((video, index: number) => (
                                <TableRow key={video._id}>
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
