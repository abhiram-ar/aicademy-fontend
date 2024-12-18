import React, { useState } from "react";
import AuthBlock from "../base/AuthBlock";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

type Props = {
    email: string | undefined;
    handleOTPVerification: (enteredOTP: string) => void;
    isVerifyDisabled?: boolean
};

const Otp: React.FC<Props> = ({ email, handleOTPVerification, isVerifyDisabled=false }) => {
    const [otp, setOtp] = useState("");
    return (
        <AuthBlock>
            <p className="font-medium mb-2">
                Enter OTP sent to {email || "temp@email.com"}
            </p>
            <div className="w-fit mx-auto">
                <InputOTP
                    maxLength={4}
                    pattern={REGEXP_ONLY_DIGITS}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                >
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
            <button>Resend?</button>
            <button
                className="w-96 bg-white py-2 px-3 border-2 border-black rounded-base mt-10 hover:bg-black hover:text-white active:bg-zinc-700"
                onClick={() => handleOTPVerification(otp)}
                disabled={isVerifyDisabled}
            >
                verify
            </button>
        </AuthBlock>
    );
};

export default Otp;
