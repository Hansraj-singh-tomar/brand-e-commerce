import React from "react";
import GridView from "./GridView";
import ListView from "./ListView";

import { useSelector } from "react-redux";


const ProductList = () => {

  const products = useSelector((state) => state.products);
  const { grid_view, filter_products } = products;
  // console.log("from productList comp",filter_products);

  if (grid_view === true) {
    return <GridView products={filter_products} />;
  }

  if (grid_view === false) {
    return <ListView products={filter_products} />;
  }

};

export default ProductList;