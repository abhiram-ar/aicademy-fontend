import AuthBlock from "@/components/base/AuthBlock";

const OnboardingRejectedCard = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-2/5 max-w-[32rem] my-40">
                <AuthBlock>
                    <h2 className="text-xl font-semibold">
                        Your Onboarding Status:{" "}
                        <span className="text-red-600">Rejected</span>
                    </h2>

                    <div className="mt-5">
                        <p className="indent-3">
                            After carefully reviewing your application, we
                            regret to inform you that it does not meet the
                            necessary criteria for approval at this time.
                        </p>
                        <p className="indent-3">
                        <br />
                            Thank you for your interest in joining AIcademy as
                            an educator. We sincerely appreciate the time and
                            effort you invested in completing the onboarding
                            process.
                        </p>
                    </div>
                </AuthBlock>
            </div>
        </div>
    );
};

export default OnboardingRejectedCard;
