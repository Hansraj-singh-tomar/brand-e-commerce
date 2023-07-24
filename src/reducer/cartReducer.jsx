
const cartReducer = (state, action) => {
  if(action.type === "ADD_TO_CART"){
    let { id, color, amount, product } = action.payload;
    // console.log(product);
    
    // tackel the existing product in ADD_TO_CART list 
    // same item two times add na ho list me 
    let existingProduct = state.cart.find((curItem) => {
      return curItem.id === id+color;
    })
    console.log(existingProduct);

    if(existingProduct) {
      let updatedProduct = state.cart.map((curItem) => {
        if(curItem.id === id+color) {
          let newAmount = curItem.amount + amount;
          if(newAmount >= curItem.max){
            newAmount = curItem.max;
          }
          return {
            ...curItem,
            amount : newAmount,
          }
        } else {
          return curItem
        }
      });
      return {
        ...state,
        cart : updatedProduct,
      }
    } else {
      let cartProduct = {
        id : id+color,
        name : product.name,
        color : color,
        amount : amount,
        image : product.image[0].url,
        price : product.price,
        max : product.stock,
      };

      return {
        ...state,
        cart : [...state.cart, cartProduct]
      } 
    } 
  }

  // To set the increment and decrement 
  if(action.type === "SET_DECREMENT"){
    let updatedProduct = state.cart.map((curElem) => {
      if(curElem.id === action.payload) {
        let decAmount = curElem.amount - 1;
        if(decAmount <= 1) {
          decAmount = 1;
        }
        return {
          ...curElem,
          amount : decAmount,
        }
      } else {
        return curElem;
      }
    })
    return {
      ...state, cart : updatedProduct
    }
  }

  if(action.type === "SET_INCREMENT"){
    let updatedProduct = state.cart.map((curElem) => {
      if(curElem.id === action.payload) {
        let incAmount = curElem.amount + 1;
        if(incAmount >= curElem.max) {
          incAmount = curElem.max;
        }
        return {
          ...curElem,
          amount : incAmount,
        }
      } else {
        return curElem;
      }
    })
    return {
      ...state, cart : updatedProduct
    }
  }

  // to remove a particular item from cart list 
  if(action.type === "REMOVE_ITEM"){
    let updatedCart = state.cart.filter((curItem) => {
      return curItem.id !== action.payload
    });
    return {
      ...state,
      cart : updatedCart
    }
  }

  // to empty or clear the cart 
  if(action.type === "CLEAR_CART") {
     return {
      ...state,
      cart : [],
     }         
  }

  // if(action.type === "CART_TOTAL_ITEM") {
  //   let updatedItemVal = state.cart.reducer((intialVal, curElem) => {
  //     let { amount } = curElem;
  //     intialVal = intialVal + amount;
  //     return intialVal;
  //   }, 0);

  //   return {
  //     ...state,
  //     total_item : updatedItemVal,
  //   }
  // }

  // if(action.type === "CART_TOTAL_PRICE"){
  //   let total_price = state.cart.reducer((intialVal, curElem) => {
  //     let { price, amount } = curElem;
  //     intialVal = intialVal + (price * amount);
  //     return intialVal;
  //   }, 0);

  //   return {
  //     ...state,
  //     total_price : total_price,
  //   }
  // }

  if (action.type === "CART_ITEM_PRICE_TOTAL") {
      let { total_item, total_price } = state.cart.reduce((accum, curElem) => {
        let { price, amount } = curElem;

        accum.total_item += amount;
        accum.total_price += price * amount;

        return accum;
      },
      {
        total_item: 0,
        total_price: 0,
      }
    );
    return {
      ...state,
      total_item,
      total_price,
    };
  }

  return state;
}

export default cartReducer