import AuthBlock from "@/components/base/AuthBlock";

const OnboardingPendingCard = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-2/5 max-w-[32rem] my-40">
                <AuthBlock>
                    <h2 className="text-xl font-semibold">
                        Your Onboarding Status:{" "}
                        <span className="text-blue-600">Pending Review</span>
                    </h2>

                    <div className="mt-5">
                        Thank you for taking the first step to join AIcademy as
                        an educator. We’ve received your onboarding details and
                        are currently reviewing your application.
                    </div>
                </AuthBlock>
            </div>
        </div>
    );
};

export default OnboardingPendingCard;
