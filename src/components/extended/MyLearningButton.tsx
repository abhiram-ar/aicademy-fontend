import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const MylearningButton = () => {
    const navigate = useNavigate();

    return (
        <Button
            onClick={() => navigate("/user/my-learning")}
            variant="neutral"
            size="md"
        >
            My learning
        </Button>
    );
};

export default MylearningButton;
