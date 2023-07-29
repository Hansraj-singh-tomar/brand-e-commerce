import { useEffect } from "react";
import styled from "styled-components";

import FilterSection from "../components/Part-1/FilterSection";
import Sort from "../components/Part-1/Sort";
import ProductList from "../components/Part-1/ProductList";

// import { useDispatch, useSelector } from "react-redux";
// import { filterProducts, sortingProducts } from "../features/productSlice";

const Products = () => {
  // const dispatch = useDispatch();
  // const products = useSelector((state) => state.products)
  
  // useEffect(() => {
  //   dispatch(filterProducts());
  //   dispatch(sortingProducts());
  // }, [products, dispatch, products.filters, products.sorting_value])

  return (
    <Wrapper>
      <div className="container grid grid-filter-column">
        <div>
          <FilterSection />
        </div>

        <section className="product-view--sort">
          <div className="sort-filter">
            <Sort />
          </div>
          <div className="main-product">
            <ProductList />
          </div>
        </section>
      </div>
    </Wrapper>
  );
};


const Wrapper = styled.section`

  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr ; {/* 20% for left portion and 80% for right portion*/}  
  }
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;

export default Products;