import { AppSidebar } from "@/components/teacher-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
    const navigate = useNavigate();
    useEffect(() => {
        //need improvement - to many rerenders
        if (!(isApproved === "success")) {
            navigate("/teach/onboard");
        }
    });

    const isApproved = useSelector(
        (state: RootState) => state.auth.user?.isApproved
    );
    return (
        <SidebarProvider>
            <AppSidebar className="border-e-2 border-zinc-400" />
            <SidebarInset className="bg-[#fff4e0]/60">
                <header className="flex h-16 shrink-0 font-publicSans items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                    </div>
                </header>
                <Outlet />
            </SidebarInset>
        </SidebarProvider>
    );
}
