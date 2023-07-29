import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice"; // it's actually productSlice instead of productReducer
import cartReducer from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});



// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "../features/cartSlice";

// export const store = configureStore({
//   reducer: {
//     allCart: cartReducer,
//   },
// });