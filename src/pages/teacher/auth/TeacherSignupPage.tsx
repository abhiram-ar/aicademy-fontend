import Signup from "@/components/auth/Signup";
import BodyBlock from "@/components/base/BodyBlock";
import NavbarOnlyLogo from "@/components/extended/NavbarOnlyLogo";
import SignupArt from "./../../../assets/teacherDoogle.png";
import { Link, useNavigate } from "react-router-dom";
import {
    useTeacherRegisterMutation,
    useTeacherVerifyMutation,
} from "@/redux/features/auth/teacherAuthAPI";
import { useState } from "react";
import Otp from "@/components/auth/Otp";
import { newUser } from "@/components/auth/Signup";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";

const TeacherSignupPage = () => {
    const [verifyEmail, { isLoading: isVerifyLoading }] =
        useTeacherVerifyMutation();
    const [register, { isLoading: isRegistrationLoading }] =
        useTeacherRegisterMutation();

    const [teacher, setTeacher] = useState<newUser>();
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
        setTeacher(data);
        try {
            const payload = await register(data).unwrap();
            setActivationDetails({
                activationToken: payload.activationToken,
                user: data,
            });
        } catch (error) {
            console.error("error while user signup", error);
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
            navigate("/teach/login");
        } catch (error) {
            console.warn("error while verifying user account", error);
            toast({
                variant: "destructive",
                title: "Error while OTP verification",
                description: (error as { data: { message: string } }).data
                    .message,
            });
        }
    };

    const handleOTPResent = async () => {
        console.log(`resent`);
        handleSignup(teacher as newUser);
        toast({
            variant: "default",
            description: `New OTP send to ${teacher?.email}`,
        });
    };

    return (
        <>
            <NavbarOnlyLogo />
            <BodyBlock>
                <div className="w-full lg:w-2/3 mx-auto flex flex-col-reverse min-h-fit h-[90vh] lg:flex lg:flex-row justify-center items-center gap-24">
                    <Toaster />
                    <div className="w-1/2 flex justify-center items-center mix-blend-multiply">
                        <img src={SignupArt} alt="login Art peice" />
                    </div>

                    <div className="m-auto mt-20 w-fit">
                        <h2 className="text-2xl font-bold mb-5 text-center">
                            Sign up and start Teaching
                        </h2>
                        {!activationDetails.activationToken ? (
                            <>
                                <Signup
                                    handleSignup={handleSignup}
                                    isSignupDisabled={isRegistrationLoading}
                                    role="teacher"
                                />
                                <p className="text-center mt-5 font-medium">
                                    Already have an account?
                                    <Link
                                        to="/teach/login"
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
                                handleOTPResent={handleOTPResent}
                            />
                        )}
                    </div>
                </div>
            </BodyBlock>
        </>
    );
};

export default TeacherSignupPage;
