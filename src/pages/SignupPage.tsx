import Signup from "@/components/auth/Signup";
import BodyBlock from "@/components/base/BodyBlock";
import NavbarOnlyLogo from "@/components/extended/NavbarOnlyLogo";
import SignupArt from "./.././assets/SignupArt.png";
import { Link } from "react-router-dom";
import { useRegisterMutation, useVerifyMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import Otp from "@/components/auth/Otp";
import { newUser } from "@/components/auth/Signup";






const SignupPage = () => {
    const [register] = useRegisterMutation();
    const [verifyEmail] = useVerifyMutation()
    
    const [activationDetails, setActivationDetails] = useState<{
        activationToken: string | null;
        user: newUser | null;
    }>({
        activationToken: null,
        user: null,
    });



    console.log(activationDetails);
    const handleSignup: (data: newUser) => void = async (data) => {
        console.log(data);
        try {
            const res = await register(data).unwrap();
            console.log(res);
            setActivationDetails({
                activationToken: res.activationToken,
                user: data,
            });
        } catch (error) {
            console.error("error while user signup");
            console.log(error);
            //toast
        }
    };


    const handleOTPVerification:(otp: string)=>void = async (otp)=>{
        console.log(otp)
        try{
            const res = await verifyEmail({activationCode: otp, activationToken: activationDetails.activationToken}).unwrap()
            console.log(res)
        }catch(error){
            console.warn("error while verifying user account");
            console.log(error)
            //toast
        }
    }

    return (
        <>
            <NavbarOnlyLogo />
            <BodyBlock>
                <div className="mx-2 flex flex-col-reverse min-h-fit h-[90vh] md:mx-52 lg:flex lg:flex-row justify-center items-baseline border gap-5">
                    <div className="w-full flex justify-center items-center mt-5  border ">
                        <img src={SignupArt} alt="login Art peice" />
                    </div>

                    <div className="m-auto mt-20 w-fit border  ">
                        <h2 className="text-2xl font-bold mb-5 text-center">
                            Sign up and start learning
                        </h2>
                        {!activationDetails.activationToken ? (
                            <>
                                <Signup handleSignup={handleSignup} />
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
                            <Otp email={activationDetails.user?.email} handleOTPVerification={handleOTPVerification}/>
                        )}
                    </div>
                </div>
            </BodyBlock>
        </>
    );
};

export default SignupPage;
