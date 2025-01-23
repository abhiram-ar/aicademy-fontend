import { useForgotUserPaswordMutation } from "@/redux/features/auth/userAuthAPIs";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassowordPageUser = () => {
    const [email, setEmail] = useState("");
    const [forgetPassword] = useForgotUserPaswordMutation();

    const handleForgetPassword = async () => {
        try {
            const res = await forgetPassword({ email }).unwrap();
            console.log(`forget result`, res);
            toast.success(`Recovery mail send to ${email}`);
            setEmail("");
        } catch (error) {
            console.error("error while resetting password", error);
            const err = error as {
                data?: { message: string };
                status?: number;
            };
            if (err.data) toast.error(err.data.message);
            else toast.error("failed to reset password");
        }
    };
    return (
        <div className="bg-slate-400 min-h-screen">
            <Toaster position="bottom-right" />
            <div className="pt-20">
                <div className="flex flex-col w-fit mx-auto border-2 border-black bg-slate-200 rounded-base p-5">
                    <div>
                        <label className="font-medium" htmlFor="email">
                            email
                        </label>
                        <br />
                        <input
                            type="email"
                            value={email}
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="enter your email"
                            className="input-neo w-96"
                        />
                    </div>
                    <button
                        onClick={handleForgetPassword}
                        className="bg-green-300 hover:bg-green-400 border-2 border-black py-2 px-3 rounded-base font-medium mt-2"
                    >
                        Reset password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassowordPageUser;
