import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const data = useContext(CartContext);

  const hasItem = data.items.length > 0;

  const totalAmount = `$${data.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    data.removeItem(id)
  };
  const cartItemAddHandler = (item) => {
    data.addItem({...item,amount:1})
  };

  
  const cartItems = (
    
    <><ul className={classes["cart-items"]}>
    {data.items.map((item) => (
      <CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={cartItemRemoveHandler.bind(null,item.id)}
        onAdd={() => cartItemAddHandler(item)}
      />
    ))}
  </ul>
  { <Checkout onCancel={props.onCloseCart} /> }
  </>
    
  );

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}

      <div className={classes.total}>
        <span>Total Amount</span>

        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItem && <button className={classes.button}>Order</button>}
      </div>

    </Modal>
    
  );
};
export default Cart;
