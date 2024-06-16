import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state, 
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img
        }
      ];
    case "REMOVE":
      return state.filter((_, index) => index !== action.index);
    case "UPDATE":
      return state.map((food) => {
        if (food.id === action.id && food.size === action.size) {
          return {
            ...food,
            qty: parseInt(food.qty) + parseInt(action.qty),
            price: parseFloat(food.price) + parseFloat(action.price)
          };
        }
        return food;
      });
      case "DROP":
        let empArray=[]
        return empArray
    default:
      console.error("Error in Reducer");
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
