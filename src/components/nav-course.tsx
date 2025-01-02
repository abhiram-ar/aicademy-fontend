import { Link } from "react-router-dom";
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
                              courseState:
                                  | "draft"
                                  | "published"
                                  | "unpublished";
                          }) => (
                              <SidebarMenuItem key={course._id}>
                                  <SidebarMenuButton asChild>
                                      <Link
                                          to={`/teach/course/draft/${course._id}`}
                                      >
                                          {course.courseState === "draft" ? (
                                              <BookDashed />
                                          ) : (
                                              <Book />
                                          )}
                                          <span>{course.title}</span>
                                      </Link>
                                  </SidebarMenuButton>
                                  <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                          <SidebarMenuAction showOnHover>
                                              <MoreHorizontal />
                                              <span className="sr-only">
                                                  More
                                              </span>
                                          </SidebarMenuAction>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent
                                          className="w-48 rounded-lg"
                                          side={isMobile ? "bottom" : "right"}
                                          align={isMobile ? "end" : "start"}
                                      >
                                          <DropdownMenuItem>
                                              <Folder className="text-zinc-500 dark:text-zinc-400" />
                                              <span>View Project</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem>
                                              <Forward className="text-zinc-500 dark:text-zinc-400" />
                                              <span>Share Project</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem>
                                              <Trash2 className="text-zinc-500 dark:text-zinc-400" />
                                              <span>Delete Project</span>
                                          </DropdownMenuItem>
                                      </DropdownMenuContent>
                                  </DropdownMenu>
                              </SidebarMenuItem>
                          )
                      )}

                <SidebarMenuItem>
                    <SidebarMenuButton className="text-sidebar-foreground/70">
                        <MoreHorizontal className="text-sidebar-foreground/70" />
                        <span>More</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    );
}
