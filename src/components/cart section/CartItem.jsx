import React, { useEffect } from 'react'
import { FaTrash } from "react-icons/fa";

import CartAmountToggle from './CartAmountToggle';
import FormatPrice from '../../Helpers/FormatPrice';

import { removeItem, setDecrement, setIncrement, cartItemPriceTotal } from '../../features/cartSlice';

import { useDispatch, useSelector } from 'react-redux';

const CartItem = ({curElem}) => {
    let {id, name, image, color, price, amount} = curElem;

    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cart)

    useEffect(() => {
        dispatch(cartItemPriceTotal())
    }, [cartData])

  return (
    <div className="cart_heading grid grid-five-column">
        
        {/* Item */}
        <div className="cart-image--name">
            <div>
            <figure>
                <img src={image} alt={id} />
            </figure>
            </div>
            <div>
            <p>{name}</p>
            <div className="color-div">
                <p>color:</p>
                <div
                className="color-style"
                style={{ backgroundColor: color, color: color }}></div>
            </div>
            </div>
        </div>
        
        {/* Price */}
        <div className="cart-hide">
            <p>
                <FormatPrice price={price}/>
            </p>
        </div>

        {/* Quantity */}
        <CartAmountToggle
            qty={amount}
            setDecrease={() => dispatch(setDecrement(id))}
            setIncrease={() => dispatch(setIncrement(id))}
        />

        {/* Subtotal */}
        <div className="car-hide">
            <p>
                <FormatPrice price={price * amount}/>
            </p>
        </div>

        {/* Remove Icon */}
        <div>
            <FaTrash className='remove_icon' onClick={() => dispatch(removeItem(id))}/>
        </div>
    </div>
  )
}

export default CartItem

