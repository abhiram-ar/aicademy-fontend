import Signup from "@/components/auth/Signup";
import BodyBlock from "@/components/base/BodyBlock";
import NavbarOnlyLogo from "@/components/extended/NavbarOnlyLogo";
import SignupArt from "./.././assets/SignupArt.png";
import { Link } from "react-router-dom";

const SignupPage = () => {
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
                        <Signup />
                        <p className="text-center mt-5 font-medium">
                            Already have an account?
                            <Link
                                to="/login"
                                className="font-bold underline ms-1"
                            >
                                login
                            </Link>
                        </p>
                    </div>
                </div>
            </BodyBlock>
        </>
    );
};

export default SignupPage;
