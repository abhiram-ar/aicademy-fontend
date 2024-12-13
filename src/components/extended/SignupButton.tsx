import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const SignupButton = () => {
    return (
        <Link to="/signup">
            <Button className="bg-[#88aaee]" variant="neutral" size="md">
                Sign up
            </Button>
        </Link>
    );
};

export default SignupButton;
