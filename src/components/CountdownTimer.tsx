import { useEffect, useState } from "react";

const CountdownTimer: React.FC<{ durationInSeconds: number }> = ({
    durationInSeconds,
}) => {
    const [timeRemaining, setTimeRemaining] = useState(durationInSeconds);

    useEffect(() => {
        const intervalTimer = setInterval(() => {
            if (timeRemaining > 0) setTimeRemaining(timeRemaining - 1);
            else clearInterval(intervalTimer)
        }, 1000);
        
        return ()=> clearInterval(intervalTimer) 
    }, [timeRemaining]);

    console.log(`render`);

    return <span> {timeRemaining}</span>;
};

export default CountdownTimer;
