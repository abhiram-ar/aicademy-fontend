import { Link, useParams } from "react-router-dom";
import { useGetDraftCourseListQuery } from "@/redux/features/teacher/courseCreationAPIs";

import {
    Book,
    BookDashed,
    CirclePlus,
    Folder,
    Forward,
    MoreHorizontal,
    Trash2,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

export function NavCourse() {
    const { isMobile } = useSidebar();
    const { data, isLoading } = useGetDraftCourseListQuery({});
    const { id: activeCourseId } = useParams();

    const shimmer = (
        <SidebarMenu>
            <SidebarMenuItem className="px-5 flex flex-col gap-2 ">
                {new Array(3).fill(0).map((_, index) => (
                    <p
                        key={index}
                        className="h-4 bg-slate-200 animate-pulse w-full rounded-base"
                    ></p>
                ))}
            </SidebarMenuItem>
        </SidebarMenu>
    );

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Course</SidebarGroupLabel>

            <SidebarMenu>
                <SidebarMenuItem>
                    <Link to="/teach/course/create">
                        <SidebarMenuButton>
                            <CirclePlus />
                            <span>Create</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>

                {isLoading
                    ? shimmer
                    : data.map(
                          (course: {
                              _id: string;
                              title: string;
                              courseState: "draft" | "published" | "blocked";
                          }) => (
                              <SidebarMenuItem key={course._id}>
                                  <SidebarMenuButton
                                      asChild
                                      className={`${
                                          course.courseState === "draft" &&
                                          `bg-yellow-100 rounded-base hover:bg-yellow-300 ${
                                              course._id === activeCourseId &&
                                              "bg-yellow-200"
                                          }`
                                      }  

                                      ${
                                          course.courseState === "blocked" &&
                                          `bg-red-100 rounded-base hover:bg-red-200 ${
                                              course._id === activeCourseId &&
                                              "bg-red-200"
                                          }`
                                      }

                                      ${
                                          course.courseState === "published" &&
                                          ` ${
                                              course._id === activeCourseId &&
                                              "bg-zinc-200"
                                          }`
                                      }
                                          
                                          `}
                                  >
                                      <Link
                                          to={`/teach/course/draft/${course._id}`}
                                          className={`${
                                              course.courseState === "draft" &&
                                              "bg-yellow-100 rounded-base hover:bg-yellow-300"
                                          }  ${
                                              course.courseState ===
                                                  "blocked" &&
                                              "bg-red-100 rounded-base hover:bg-red-200"
                                          }`}
                                      >
                                          {course.courseState === "draft" ? (
                                              <BookDashed />
                                          ) : (
                                              <Book />
                                          )}
                                          <span>{course.title}</span>
                                      </Link>
                                  </SidebarMenuButton>
                              </SidebarMenuItem>
                          )
                      )}
            </SidebarMenu>
        </SidebarGroup>
    );
}
