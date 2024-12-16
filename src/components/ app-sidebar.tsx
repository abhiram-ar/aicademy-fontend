import {
    Calendar,
    Home,
    Inbox,
    Search,
    Settings,
    UserPenIcon,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// Menu items.
const items = [
   
    {
        title: "Teacher onboarding",
        url: "/admin/dashboard/onboard",
        icon: UserPenIcon,
    },
];

export function AppSidebar() {
    return (
        <Sidebar className="bg-[#374151] text-white">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
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
            </SidebarContent>
        </Sidebar>
    );
}
