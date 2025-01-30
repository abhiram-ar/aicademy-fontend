import * as React from "react";
import {
    AudioWaveform,
    Command,
    GalleryVerticalEnd,
    HandCoins,
    LayoutDashboard,
} from "lucide-react";
import { NavCourse } from "@/components/nav-course";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

// This is sample data.
const data = {
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader className="font-publicSans">
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent className="font-publicSans">
                {/* <NavMain items={data.navMain} /> */}

                <SidebarGroup className="group-data-[collapsible=icon]:hidden">
                    <SidebarGroupLabel>Dashboard</SidebarGroupLabel>

                    <SidebarMenu>
                        <SidebarMenuItem>
                            <Link to="/teach">
                                <SidebarMenuButton>
                                    <LayoutDashboard />
                                    <span>Overview</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link to="/teach/payout">
                                <SidebarMenuButton>
                                    <HandCoins />
                                    <span>Payout</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                <NavCourse />
            </SidebarContent>
            <SidebarFooter className="font-publicSans">
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
