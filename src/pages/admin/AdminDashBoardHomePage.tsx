import Layout from "@/layout/sidebar";
import { Outlet } from "react-router-dom";

const AdminDashBoardHomePage = () => {
    return (
        <div>
            <Layout>
                <Outlet />
            </Layout>
        </div>
    );
};

export default AdminDashBoardHomePage;
