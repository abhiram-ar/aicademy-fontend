import React, { useState } from "react";
import AuthBlock from "../base/AuthBlock";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import CountdownTimer from "../CountdownTimer";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";

type Props = {
    email: string | undefined;
    handleOTPVerification: (enteredOTP: string) => void;
    isVerifyDisabled?: boolean;
    handleOTPResent: () => void;
};

const Otp: React.FC<Props> = ({
    email,
    handleOTPVerification,
    isVerifyDisabled,
    handleOTPResent,
}) => {
    const [otp, setOtp] = useState("");
    const [isResendDisabled, setResendDisabled] = useState(false);

    const OTPResendExpiryInSeconds = 60;

    return (
        <AuthBlock>
            <p className="font-medium mb-2 text-center">
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
            <button
                disabled={isResendDisabled}
                onClick={() => {
                    handleOTPResent();
                    setResendDisabled(true);
                    setTimeout(
                        () => setResendDisabled(false),
                        OTPResendExpiryInSeconds * 1000
                    );
                }}
                className={`underline ${
                    isResendDisabled
                        ? "text-zinc-400"
                        : "text-black font-semibold"
                }`}
            >
                Resend? 
            </button>
                {isResendDisabled && (
                    <CountdownTimer
                        durationInSeconds={OTPResendExpiryInSeconds}
                    />
                )}
            <button
                className={`${isVerifyDisabled || otp.length < 4 ? "bg-zinc-400 hover: " : "bg-white hover:bg-black hover:text-white"  } " min-w-96 w-full py-2 px-3 border-2 border-black rounded-base mt-5  active:bg-zinc-700"`}
                onClick={() => handleOTPVerification(otp)}
                disabled={isVerifyDisabled || otp.length < 4}
            >
                verify
            </button>
        </AuthBlock>
    );
};

export default Otp;
