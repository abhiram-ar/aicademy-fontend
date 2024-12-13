import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const SignupButton = () => {
    return (
        <Button className="bg-[#88aaee]" variant="neutral" size="md">
            <Link to="/signup">Sign up</Link>
        </Button>
    );
};

export default SignupButton;
