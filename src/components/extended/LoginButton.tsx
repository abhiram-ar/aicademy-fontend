import { Button } from "../ui/button";
import { Link } from "react-router-dom";
const LoginButton = () => {
    return (
        <Link to="/login">
            <Button variant="neutral" size="md">
                Login
            </Button>
        </Link>
    );
};

export default LoginButton;
