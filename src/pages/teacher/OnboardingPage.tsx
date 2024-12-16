import AIcademyLogo from "@/components/base/AIcademyLogo";
import BodyBlock from "@/components/base/BodyBlock";
import Navbar from "@/components/base/Navbar";
import { Button } from "@/components/ui/button";
import OnboardingForm from "./OnboardingForm";
import { useTeacherOnboardingMutation } from "@/redux/features/auth/teacherAuthAPI";

const Onboarding = () => {
    const [onboardTeacher] = useTeacherOnboardingMutation();

    const handleOnboarding = async (data: object) => {
        console.log(data);
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (value instanceof FileList) {
                formData.append(key, value[0]);
            } else {
                formData.append(key, (value as string).trim());
            }
        });

        try {
            const res =await onboardTeacher(formData).unwrap();
            console.log(res)
        } catch (error) {
            console.error("error while onboarding", error);
        }

        console.log(formData);
    };
    return (
        <>
            <Navbar>
                <AIcademyLogo />
                <Button variant="neutral">logout</Button>
            </Navbar>
            <BodyBlock>
                <OnboardingForm handleOnboarding={handleOnboarding} />
            </BodyBlock>
        </>
    );
};

export default Onboarding;
