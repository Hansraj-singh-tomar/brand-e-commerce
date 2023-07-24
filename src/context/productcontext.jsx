import React, { createContext, useContext, useEffect, useReducer } from 'react'
import axios from 'axios'

import reducer from '../reducer/productReducer'

const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {},
}

const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const getProducts = async (url) => {
        dispatch({ type: "SET_LOADING" });
        // useEffect(() => {
        //     dispatch({ type : "SET_LOADING" });
        // }, []);
        try {
            const res = await axios.get(url);
            // console.log(res);
            const products = await res.data;
            // console.log(products);
            dispatch({ type: "SET_API_DATA", payload: products });
        } catch (error) { 
            dispatch({ type: "API_ERROR" })
        }
    }   

    // My 2nd api call for single product
    const getSingleProduct = async (url) => { // yha hamara url SingleProduct.js file se aa rha hai 
        dispatch({ type: "SET_SINGLE_LOADING" });
        // useEffect(() => {
        //     dispatch({ type : "SET_SINGLE_LOADING" });
        // }, []);
        try {
            const res = await axios.get(url);
            const products = await res.data;
            dispatch({ type: "SET_SINGLE_PRODUCT", payload: products });
        } catch (error) {
            dispatch({ type: "SET_SINGLE_ERROR" })
        }
    }

    useEffect(() => {
       getProducts(API); 
    }, []);

  return (
    <AppContext.Provider value={{ ...state, getSingleProduct }}>
        {children}
    </AppContext.Provider>
  )
}

const useProductContext = () => {
    return useContext(AppContext);
}


export { AppProvider, AppContext, useProductContext }
