import { useReducer } from "react";

const initState = {
  value: "",
  isTouched: false,
};

const inputReducer = (prevState, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...prevState,
        value: action.value,
      };
    case "ON_BLUR":
      return {
        ...prevState,
        isTouched: action.isTouched,
      };
      case "RESET":
        return {
          ...prevState,   
          value:''       
        }

    default:
      return {
        initState,
      };
  }
};

export const useInput = (validaState) => {
  const [state, dispatch] = useReducer(inputReducer, initState);

  const valueChangeHandler = (e) => {
    dispatch({ type: "ADD", value: e.target.value });
  };

  const inputBlurHandler = () => {
    dispatch({ type: "ON_BLUR", isTouched: false });
  };

  const resetItemsHandler = () =>{
    dispatch({type: 'RESET'})
  }
  const valueIsValid = validaState(state.value);
  const hasError = !valueIsValid && state.isTouched;

  return {
    value: state.value,
    isValid: valueIsValid,
    hasError,
    resetItemsHandler,
    valueChangeHandler,
    inputBlurHandler,
  };
};
