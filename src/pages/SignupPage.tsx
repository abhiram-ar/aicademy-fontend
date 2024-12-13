import Signup from "@/components/auth/Signup";
import BodyBlock from "@/components/base/BodyBlock";
import NavbarOnlyLogo from "@/components/extended/NavbarOnlyLogo";
import SignupArt from "./.././assets/SignupArt.png";
import { Link, useNavigate } from "react-router-dom";
import {
    useRegisterMutation,
    useVerifyMutation,
} from "@/redux/features/auth/authApi";
import { useState } from "react";
import Otp from "@/components/auth/Otp";
import { newUser } from "@/components/auth/Signup";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

const SignupPage = () => {
    const [register, { isLoading: isRegistrationLoading }] =
        useRegisterMutation();
    const [verifyEmail, { isLoading: isVerifyLoading }] = useVerifyMutation();
    const navigate = useNavigate();

    const [activationDetails, setActivationDetails] = useState<{
        activationToken: string | null;
        user: newUser | null;
    }>({
        activationToken: null,
        user: null,
    });

    const handleSignup: (data: newUser) => void = async (data) => {
        console.log(data);
        try {
            const payload = await register(data).unwrap();
            setActivationDetails({
                activationToken: payload.activationToken,
                user: data,
            });
        } catch (error) {
            console.error("error while user signup");
            console.log(error);
             toast({
                variant: "destructive",
                title: "Error while signup",
                description: (error as { data: { message: string } }).data
                    .message,
            });
        }
    };

    const handleOTPVerification: (otp: string) => void = async (otp) => {
        console.log(otp);
        try {
            const res = await verifyEmail({
                activationCode: otp,
                activationToken: activationDetails.activationToken,
            }).unwrap();
            console.log(res);
            navigate("/login");
        } catch (error) {
            console.warn("error while verifying user account", error);
            //toast
        }
    };

    return (
        <>
            <NavbarOnlyLogo />
            <BodyBlock>
                <Toaster/>
                <div className="w-full lg:w-2/3 mx-auto flex flex-col-reverse min-h-fit h-[90vh] lg:flex lg:flex-row justify-center items-center gap-16">
                    <div className="w-full flex justify-center items-center">
                        <img src={SignupArt} alt="login Art peice" />
                    </div>

                    <div className="m-auto mt-20 w-fit">
                        <h2 className="text-2xl font-bold mb-5 text-center">
                            Sign up and start learning
                        </h2>
                        {!activationDetails.activationToken ? (
                            <>
                                <Signup
                                    handleSignup={handleSignup}
                                    isSignupDisabled={isRegistrationLoading}
                                />
                                <p className="text-center mt-5 font-medium">
                                    Already have an account?
                                    <Link
                                        to="/login"
                                        className="font-bold underline ms-1"
                                    >
                                        login
                                    </Link>
                                </p>
                            </>
                        ) : (
                            <Otp
                                email={activationDetails.user?.email}
                                handleOTPVerification={handleOTPVerification}
                                isVerifyDisabled={isVerifyLoading}
                            />
                        )}
                    </div>
                </div>
            </BodyBlock>
        </>
    );
};

export default SignupPage;
