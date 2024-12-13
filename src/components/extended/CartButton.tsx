import {Button} from "../ui/button"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const CartButton = () => {
  return (
    <Button className="p-3 bg-white" size="md"><ShoppingCartOutlinedIcon/></Button>
  )
}

export default CartButton