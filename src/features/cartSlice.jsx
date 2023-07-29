// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// const getLocalCartData = () => {
//   return new Promise((resolve) => {
//     let localCartData = localStorage.getItem('thapaCart');
//     if (!localCartData || localCartData === '[]') {
//       resolve([]);
//     } else {
//       resolve(JSON.parse(localCartData));
//     }
//   });
// };

// export const loadCartDataFromLocalStorage = createAsyncThunk(
//   'loadCartDataFromLocalStorage',
//   async () => {
//     return await getLocalCartData();
//   }
// );

const initialState = {
  cart: [],
  // cart: getLocalCartData(),
  total_item: "",
  total_price: "",
  shipping_fee: 50000,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let {id, color, qty, singleProduct} = action.payload;

      let existingProduct = state.cart.find((currItem) => {
        return currItem.id === id+color;
      })
      // console.log(existingProduct);

      if(existingProduct) {
        let updatedCartItem = state.cart.map((currItem) => {
          if(currItem.id === id+color) {
            let newQty = currItem.amount + qty;

            if(newQty >= currItem.max){
              newQty = currItem.max;
            }

            currItem.amount = newQty
          }else{
            return currItem
          }
        })
        state.cart.push(updatedCartItem)
      }else{
        let productCart = {
          id: id+color,
          name: singleProduct.name,
          color: color, 
          amount: qty,
          image: singleProduct.image[0].url,
          price: singleProduct.price,
          max: singleProduct.stock,
        };
        state.cart.push(productCart);
      }
 
    },

    setDecrement: (state, action) => {
      const itemIdToDecrement = action.payload;
      state.cart = state.cart.map((currItem) => {
        if(currItem.id === itemIdToDecrement){
          let decQty  = currItem.amount - 1;
          if(decQty <= 1){
            decQty = 1;
          }
          currItem.amount = decQty;
        }
        return currItem  
      })
    },

    setIncrement: (state, action) => {
      const itemIdToIncrement = action.payload;
      state.cart = state.cart.map((currItem) => {
        if(currItem.id === itemIdToIncrement){
          let incQty  = currItem.amount + 1;
          if(incQty >= currItem.max){
            incQty = currItem.max;
          }
          currItem.amount = incQty;
        }
        return currItem
      })
      
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    clearCart: (state, action) => {
      state.cart = [];
    },

    cartItemPriceTotal: (state, action) => {
      let {total_item, total_price} = state.cart.reduce((acc, currItem) => {
        let { price, amount } = currItem;

        acc.total_item += amount;
        acc.total_price += price * amount;

        return acc;
      }, {total_item: 0, total_price: 0});

      state.total_item = total_item;
      state.total_price = total_price;
    },
    // setCartData: (state, action) => {
    //   state.cart = action.payload;
    //   // Update localStorage with the new cart data
    //   localStorage.setItem('thapaCart', JSON.stringify(state.cart));
    // },
    // extraReducers: (builder) => {
    //   builder.addCase(loadCartDataFromLocalStorage.fulfilled, (state, action) => {
    //     state.cart = action.payload;
    //   });
    // },
  },

});


export default cartSlice.reducer;

// export const {addToCart, setDecrement, setIncrement, removeItem, clearCart, cartItemPriceTotal, setCartData} = cartSlice.actions; 
export const {addToCart, setDecrement, setIncrement, removeItem, clearCart, cartItemPriceTotal} = cartSlice.actions; 