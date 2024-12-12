import React from "react";
import AuthBlock from "../base/AuthBlock";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";

type Props = {email: string}

const Otp:React.FC<Props> = ({email}) => {
    return (
        <AuthBlock>
          <p className="font-medium mb-2">Enter OTP sent to {email || "temp@email.com"}</p>
            <div className="w-fit mx-auto">
                <InputOTP maxLength={4}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                    </InputOTPGroup>
                </InputOTP>
            </div>
            <button className="w-full bg-white py-2 px-3 border-2 border-black rounded-base mt-10 hover:bg-black hover:text-white active:bg-zinc-700">
                verify
            </button>
        </AuthBlock>
    );
};

export default Otp;
