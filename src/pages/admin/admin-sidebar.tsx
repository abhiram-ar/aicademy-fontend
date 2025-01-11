import {
    ChevronUp,
    CircleDollarSign,
    LayoutDashboard,
    MessageSquareWarning,
    Tag,
    User2,
    UserPenIcon,
    Users,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { logout } from "@/redux/features/auth/authSlice";
import { useAdminLogoutMutation } from "@/redux/features/auth/adminAuthAPIs";
import { useDispatch } from "react-redux";
// Menu items.
const items = [
    {
        title: "Teacher onboarding",
        url: "/admin/dashboard/onboard",
        icon: UserPenIcon,
    },
];

export function AppSidebar() {
    const dispath = useDispatch();

    const [logoutAPI] = useAdminLogoutMutation();
    const handleLogout = async () => {
        try {
            dispath(logout());
            await logoutAPI({}).unwrap();
        } catch (error) {
            console.error(`error while logging out admin`, error);
        }
    };

    return (
        <Sidebar className="border-none border-e-2  border-black">
            <SidebarContent className="bg-zinc-800 text-white">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-zinc-400">
                        Dashboard
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/admin/dashboard">
                                        <LayoutDashboard />
                                        <span>Overview</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/admin/dashboard/revenue">
                                        <CircleDollarSign />
                                        <span>Revenue</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-zinc-400">
                        Teacher
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-zinc-400">
                        User
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/admin/dashboard/user/management">
                                        <Users />
                                        <span>User management</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/admin/dashboard/user/reports">
                                        <MessageSquareWarning />
                                        <span>Reports</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-zinc-400">
                        Course
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/admin/dashboard/course/coupon">
                                        <Tag />
                                        <span>Coupons</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="bg-zinc-600 text-white border-e-2 border-black">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="hover:bg-zinc-500 hover:text-white">
                                    <User2 /> Admin
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width] bg-slate-300"
                            >
                                <DropdownMenuItem className="bg-slate-300 hover:bg-slate-400">
                                    <span>Account</span>
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={handleLogout}
                                    className="bg-slate-300 hover:bg-slate-400"
                                >
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
