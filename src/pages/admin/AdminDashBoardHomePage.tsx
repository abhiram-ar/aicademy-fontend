import Layout from "@/pages/admin/AdminLayout";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const AdminDashBoardHomePage = () => {
    const isAdmin = useSelector<RootState>((state) =>
        state.auth.user?.role === "admin" ? true : false
    );
    
    const navigate = useNavigate()
    useEffect(()=>{
        if(!isAdmin){
            navigate("/")
        }
    })
    return (
        <div>
            <Layout>
                <Outlet />
            </Layout>
        </div>
    );
};

export default AdminDashBoardHomePage;
