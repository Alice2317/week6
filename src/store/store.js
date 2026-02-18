import { createContext } from "react";
// cart
export const cartContext = createContext({});

export const initCarts = {
  carts: [],
  isLoading: true,
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case 'initCarts':
      return {
        ...state,
        carts: action.payload.carts,
        isLoading: false,
      };
    case 'addCart':
      
      let addIndex = state.carts.findIndex(item => item.product_id === action.payload.product_id);
      
      // 避免重複的產品
      if (addIndex > -1) {
        let newCarts = state.carts.map((item, index) => {
          if (index === addIndex) {
            return { ...item, qty: action.payload.qty };
          }
          return item;
        });
        return { ...state, carts: newCarts };
      } else {
        return {
          ...state,
          carts: [...state.carts, action.payload],
        }
      }
    case 'removeCart':
      let removeIndex = state.carts.findIndex(item => item.product_id === action.payload.product_id);
      state.carts.splice(removeIndex, 1);
      return { ...state };
    case 'clearCart':
      return { ...state, carts: []};
    default:
      return state;
  }
};