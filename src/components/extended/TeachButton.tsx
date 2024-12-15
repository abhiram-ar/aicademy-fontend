import { useNavigate } from "react-router-dom"
import {Button} from "../ui/button"

const TeachButton = () => {

  const navigate = useNavigate()
  return (
    <Button variant="neutral" size="md" onClick={()=> navigate("/teach/login")}>Teach</Button>
  )
}

export default TeachButton