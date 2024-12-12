import Signup from "@/components/auth/Signup";
import BodyBlock from "@/components/base/BodyBlock";
import NavbarOnlyLogo from "@/components/extended/NavbarOnlyLogo";
import SignupArt from "./.././assets/SignupArt.png";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import Otp from "@/components/auth/Otp";

const SignupPage = () => {
    const [register] = useRegisterMutation();
    const [activationToken, setActivationToken] = useState(null);
    console.log(activationToken)
    const handleSignup: (data: object) => void = async (data) => {
        console.log(data);
        try {
            const res = await register(data).unwrap();
            console.log(res);
            setActivationToken({
                ...res,
                user: data,
            });
        } catch (error) {
            console.error("error while user signup");
            console.log(error);
            //toast
        }
    };

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
                        {!activationToken ? (
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
                            <Otp email={activationToken.user.email} />
                        )}
                    </div>
                </div>
            </BodyBlock>
        </>
    );
};

export default SignupPage;
