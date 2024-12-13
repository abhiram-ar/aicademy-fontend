import { Button } from "../ui/button";
import {Link} from "react-router-dom"
const LoginButton = () => {
    return (
        <Button variant="neutral" size="md">
            <Link to="/login">Login</Link>
        </Button>
    );
};

export default LoginButton;
