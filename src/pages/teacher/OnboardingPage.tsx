import AIcademyLogo from "@/components/base/AIcademyLogo";
import BodyBlock from "@/components/base/BodyBlock";
import Navbar from "@/components/base/Navbar";
import { Button } from "@/components/ui/button";
import React from "react";
import OnboardingForm from "./OnboardingForm";

const Onboarding = () => {
    return (
        <>
            <Navbar>
                <AIcademyLogo />
                <Button variant="neutral">logout</Button>
            </Navbar>
            <BodyBlock>
                <OnboardingForm />
            </BodyBlock>
        </>
    );
};

export default Onboarding;
