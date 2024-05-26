import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { Button } from "../styles/Button";


import CartAmountToggle from "./cart section/CartAmountToggle";
import { addToCart } from "../features/cartSlice";
// import { addToCart, setCartData } from "../features/cartSlice";
// import { loadCartDataFromLocalStorage } from "../features/cartSlice";

import { useDispatch, useSelector } from "react-redux";


const AddToCart = ({ singleProduct }) => {


  // const {id, colors, stock } = singleProduct;
  const { id, stock } = singleProduct;

  const dispatch = useDispatch();
  // const cartData = useSelector((state) => state.cart);

  // const [color, setColor] = useState(colors[0]);
  const [qty, setQty] = useState(1);

  const setDecrease = () => {
    qty > 1 ? setQty(qty - 1) : setQty(1)
  };

  const setIncrease = () => {
    qty < stock ? setQty(qty + 1) : setQty(stock);
  };

  // useEffect(() => {
  //   dispatch(loadCartDataFromLocalStorage());
  //   dispatch(setCartData(cartData));
  // }, [cartData]);

  return (
    <Wrapper>
      {/* <div className="colors">
        <p>
          Colors:
          {colors.map((curColor, index) => {
            return (
              <button
                key={index}
                style={{ backgroundColor: curColor }}
                className={color === curColor ? "btnStyle active" : "btnStyle"}
                onClick={() => setColor(curColor)}
              >
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
              </button>
            );
          })}
        </p>
      </div> */}

      {/* add to cart  */}
      <CartAmountToggle
        qty={qty}
        setDecrease={setDecrease}
        setIncrease={setIncrease}
      />

      <NavLink to="/cart">
        <Button className="btn" onClick={() => dispatch(addToCart({ id, qty, singleProduct }))}>Add To Cart</Button>
      </NavLink>
      {/* yha colors nhi color ko pass kiya hai as a argument and amount ek state variable hai */}
      {/* add to cart ke liye ek nya context/reducer create karenge  */}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .colors p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }
  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }
  /* we can use it as a global one too  */
  .amount-toggle {
    margin-top: 3rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.4rem;
    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }
    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }
`;

export default AddToCart