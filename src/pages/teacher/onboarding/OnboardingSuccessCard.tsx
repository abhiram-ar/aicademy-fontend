import AuthBlock from "@/components/base/AuthBlock";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const OnboardingSuccessCard = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-2/5 max-w-[32rem] my-40">
                <AuthBlock>
                    <h2 className="text-xl font-bold">
                        Your Onboarding Status:
                        <span className="text-green-600"> onBoarded 🎉</span>
                    </h2>

                    <div className="mt-5">
                        Congratulations and welcome to AIcademy! We’re thrilled
                        to inform you that your onboarding process has been
                        successfully completed. You are now officially part of
                        our educator community. We look forward to seeing you
                        create amazing learning experiences!
                    </div>
                    <div className="flex justify-end">
                        <Link to="teach/dashboard">
                            <Button className="mt-5 bg-white" variant="reverse">
                                Take me to Dashboard
                            </Button>
                        </Link>
                    </div>
                </AuthBlock>
            </div>
        </div>
    );
};

export default OnboardingSuccessCard;
