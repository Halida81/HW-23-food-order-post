import CartContext from "../../store/cart-context";
import classes from "./Checkout.module.css";
import { useContext, useState } from "react";
import { useInput } from "../../utils/hooks/useInput";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Checkout = (props) => {
const [error,setError] = useState({isError:null, message:''})
  const notify = (message) => {
    if(message === "owibka"){
      return toast.error(message)
    }
    if(message === "Данные успешно отправлены"){
      return toast.success(message)
    }
  }

  const { items, totalAmount } = useContext(CartContext);
  const {
    value: name,
    isValid: nameIsValid,
    resetItemsHandler: resetItemsHandler,
    valueChangeHandler: inputChangeHandler,
    inputBlurHandler: nameBlurChangeHandler,
  } = useInput((value) => value.trim() === "");

  const {
    value: street,
    isValid: streetIsValid,
    resetItemsHandler: resetItemsHandler3,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurChangeHandler,
  } = useInput((value) => value.trim() === "");

  const {
    value: postalCode,
    resetItemsHandler: resetItemsHandler2,
    isValid: postalCodeIsValid,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurChangeHandler,
  } = useInput((value) => value.trim() === "");

  const {
    value: city,
    isValid: cityIsValid,
    resetItemsHandler: resetItemsHandler4,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurChangeHandler,
  } = useInput((value) => value.trim() === "");

  let confirmIsValid = false;
  if (!nameIsValid && !streetIsValid && !postalCodeIsValid && !cityIsValid) {
    confirmIsValid = true;
  }

  let data = {
    name,
    street,
    postalCode,
    city,
    items,
    totalAmount,
  };

  const confirmHandler = (event) => {
    event.preventDefault();

    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://food-order-7c880-default-rtdb.firebaseio.com//order.json",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if(response.ok){
          notify('Данные успешно отправлены')
        }
        if (!response.ok) {
          throw new Error("возникло ошибка при отправке");
          // notify('')
        }
      } catch (error) {
        setError({isError:true, message:error.message})
        notify(error.message)
      }
    };

    fetchMeals();

    resetItemsHandler();
    resetItemsHandler2();
    resetItemsHandler3();
    resetItemsHandler4();
  };

  return (
    <form onSubmit={confirmHandler}>
      <ToastContainer />

      <div className={classes.control}>
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          onChange={inputChangeHandler}
          onBlur={nameBlurChangeHandler}
          value={name}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={streetChangeHandler}
          onBlur={streetBlurChangeHandler}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal code</label>
        <input
          type="text"
          id="postal"
          value={postalCode}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurChangeHandler}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={cityChangeHandler}
          onBlur={cityBlurChangeHandler}
        />
      </div>
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
      <button disabled={!confirmIsValid} >Confirm</button>
    </form>
  );
};
export default Checkout;
//возникло ошибка при отправке