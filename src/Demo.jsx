import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {getProducts, getSingleProducts} from './features/productSlice';


const Demo = () => {
    const dispatch = useDispatch();
    const {isLoading, isError, products, isSingleLoading, singleProduct} = useSelector((state) => state.products);
    console.log(products);  // (12) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    console.log(singleProduct); // {id: 'thapaserialnoa', name: 'iphone x', company: 'apple', price: 600000, colors: Array(3), …}

    useEffect(() => {
      dispatch(getProducts())
      dispatch(getSingleProducts('thapaserialnoa'))
    }, [])

    
  return (
    <div>
        Demo
        {/* {
          products.map((item, index) => {
            return(
              <div key={index}>{item.name}</div>
            )
          })
        } */}
    </div>
  )
}

export default Demo