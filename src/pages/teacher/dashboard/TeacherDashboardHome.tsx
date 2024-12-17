import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TeacherDashboardHome = () => {
    const navigate = useNavigate();
    const isApproved = useSelector(
        (state: RootState) => state.auth.user?.isApproved
    );
    console.log(isApproved) 
    useEffect(() => {
      //need improvement - to many rerenders
        if (!(isApproved === "success")) {
            navigate("/teach/onboard");
        }
    });

    return <div>TeacherDashboardHome</div>;
};

export default TeacherDashboardHome;
