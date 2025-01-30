import AIcademyLogo from "@/components/base/AIcademyLogo";
import Navbar from "@/components/base/Navbar";
import { Button } from "@/components/ui/button";
import OnboardingForm from "./OnboardingForm";
import { useTeacherLogoutMutation } from "@/redux/features/auth/teacherAuthAPI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./../../../redux/store.ts";
import { useNavigate } from "react-router-dom";
import OnboardingPendingCard from "./OnboardingPendingCard.tsx";
import OnboardingRejectedCard from "./OnboardingRejectedCard.tsx";
import { logout } from "@/redux/features/auth/authSlice.ts";
import OnboardingSuccessCard from "./OnboardingSuccessCard.tsx";
import Footer from "@/components/Footer.tsx";

const OnboardingPage = () => {
    const [logoutTeacher] = useTeacherLogoutMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isApproved = useSelector(
        (state: RootState) => state.auth.user?.isApproved
    );
    const handleLogout = async () => {
        try {
            const res = await logoutTeacher({}).unwrap();
            console.log("logout response", res);
            dispatch(logout());
            navigate("/teach/login", { replace: true });
        } catch (error) {
            console.error("error while logging out teacher", error);
        }
    };

    let onboardingElement;

    if (isApproved === "rejected") {
        onboardingElement = <OnboardingRejectedCard />;
    } else if (isApproved === "pending") {
        onboardingElement = <OnboardingPendingCard />;
    } else if (isApproved === "success") {
        onboardingElement = <OnboardingSuccessCard />;
    } else {
        onboardingElement = <OnboardingForm />;
    }

    return (
        <>
            <Navbar>
                <AIcademyLogo />
                <Button variant="neutral" onClick={handleLogout}>
                    logout
                </Button>
            </Navbar>
            <div className="w-full h-screen bg-paperYellow">
                {onboardingElement}
            </div>
            <Footer />
        </>
    );
};

export default OnboardingPage;
