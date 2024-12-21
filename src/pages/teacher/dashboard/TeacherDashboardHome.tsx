import { Button } from "@/components/ui/button";
import { logout } from "@/redux/features/auth/authSlice";
import { useTeacherLogoutMutation } from "@/redux/features/auth/teacherAuthAPI";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TeacherDashboardHome = () => {
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

    const [logoutAPI] = useTeacherLogoutMutation();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            await logoutAPI({}).unwrap();
            dispatch(logout());
            // dispatch(apiSlice.util.resetApiState())
            navigate("/")
        } catch (error) {
            console.error(`error while logging out teacher`, error);
        }
    };

    return (
        <div>
            <h1>Teacher Dashboard Home</h1>
            <Button onClick={handleLogout}>logout</Button>
        </div>
    );
};

export default TeacherDashboardHome;
