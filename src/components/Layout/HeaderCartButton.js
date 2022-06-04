import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext)
 const [btnIsHighLight, setBtnIsHighLight] = useState(false)


  const numberOfCartItems = cartCtx.items.reduce((currNumber, item) => {
    return currNumber + item.amount
  }, 0)

  const btnClasses = `${classes.button} ${btnIsHighLight&&classes.bump}`

  useEffect(() =>{
if(cartCtx.items.length === 0){
  return;
}
setBtnIsHighLight(true)
const timer = setTimeout(() => setBtnIsHighLight(false),300)
return () =>{
  clearTimeout(timer)
}
  },[cartCtx.items])
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};
export default HeaderCartButton;
