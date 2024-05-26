import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const API = "https://api.pujakaitem.com/api/products";
const API = "https://dummyjson.com/products";

export const getProducts = createAsyncThunk("getProducts", async () => {
    const response = await fetch(API)
    const data = await response.json();
    return data.products;
})

export const getSingleProducts = createAsyncThunk("getSingleProducts", async (id) => {
    const response = await fetch(`${API}/${id}`)
    const data = await response.json();
    return data;
})

const initialState = {
    isLoading: false,
    isError: false,
    grid_view: true,
    isSingleLoading: false,

    sorting_value: "lowest",

    all_products: [],
    filter_products: [],
    featureProducts: [],
    singleProduct: {},

    filters: {
        text: "",
        category: "all",
        company: "all",
        color: "all",
        maxPrice: 0,
        price: 0,
        minPrice: 0,
    },
};

export const productSlice = createSlice({
    name: "Products", // this for dev tools
    initialState,
    reducers: {

        gridView: (state, action) => {
            state.grid_view = true;
        },

        listView: (state, action) => {
            state.grid_view = false;
        },

        sortingProducts: (state, action) => {
            let newSortData;
            let sorting_value = action.payload;

            const { filter_products } = state;
            function sortProd(a, b) {
                if (sorting_value === "lowest") {
                    return a.price - b.price;
                }

                if (sorting_value === "highest") {
                    return b.price - a.price;
                }

                if (sorting_value === "a-z") {
                    return a.name.localeCompare(b.name);
                }

                if (sorting_value === "z-a") {
                    return b.name.localeCompare(a.name);
                }
            }
            newSortData = [...filter_products].sort(sortProd);

            state.filter_products = [...newSortData];
        },

        updateFilterValue: (state, action) => {
            const { name, value } = action.payload;

            state.filters = {
                ...state.filters,
                [name]: value,
            }
        },

        filterProducts: (state, action) => {
            let { all_products } = state;
            let tempFilterProduct = all_products;

            const { text, category, company, color, price } = state.filters;

            if (text) {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.name.toLowerCase().includes(text);  // startWith bhi use kar sakte hai 
                });
            }

            if (category !== "all") {
                tempFilterProduct = tempFilterProduct.filter(
                    (curElem) => curElem.category === category
                );
            }

            if (company !== "all") {
                tempFilterProduct = tempFilterProduct.filter(
                    (curElem) => curElem.company.toLowerCase() === company.toLowerCase()
                );
            }

            if (color !== "all") {
                tempFilterProduct = tempFilterProduct.filter((curElem) => {
                    return curElem.colors.includes(color)
                });
            }

            // Handle the "all" case for price separately
            if (price > 0) {
                tempFilterProduct = tempFilterProduct.filter(
                    (curElem) => curElem.price <= price
                );
            }

            state.filter_products = [...tempFilterProduct];

        },

        clearFilters: (state, action) => {
            state.filters = {
                text: "",
                category: "all",
                company: "all",
                color: "all",
                maxPrice: 0,
                price: state.filters.maxPrice,
                minPrice: state.filters.maxPrice,
            };
        },

    },
    extraReducers: {

        //  for all products
        [getProducts.pending]: (state) => {
            state.isLoading = true
        },
        [getProducts.fulfilled]: (state, action) => {
            let priceArr = action.payload.map((curElem) => curElem.price);
            let maxPrice = Math.max(...priceArr);
            // const featureData = action.payload.filter((curElem) => {
            //     return curElem.featured === true;
            // });
            // state.products = featureData;
            state.isLoading = false;
            state.all_products = [...action.payload];
            state.filter_products = [...action.payload];
            state.filters.maxPrice = maxPrice;
            state.filters.price = maxPrice;
        },
        [getProducts.rejected]: (state) => {
            state.isLoading = false;
            state.isError = true;
        },

        // for single products
        [getSingleProducts.pending]: (state) => {
            state.isSingleLoading = true;
        },
        [getSingleProducts.fulfilled]: (state, action) => {
            state.isSingleLoading = false;
            state.singleProduct = action.payload;
        },
        [getSingleProducts.rejected]: (state) => {
            state.isSingleLoadinge = false;
            state.isError = true;
        },

    }
});


export default productSlice.reducer;
export const { gridView, listView, clearFilters, filterProducts, updateFilterValue, sortingProducts } = productSlice.actions;



// Another way to do using builer extraReducuder(builder)


// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//   allProducts: [],
//   singleProduct: null,
//   loading: false,
//   error: null,
// };

// // Replace 'YOUR_API_BASE_URL' with the base URL of your API.
// const API_BASE_URL = 'YOUR_API_BASE_URL';

// // Thunk for fetching all products
// export const fetchAllProducts = createAsyncThunk('products/fetchAll', async () => {
//   const response = await axios.get(`${API_BASE_URL}/products`);
//   return response.data;
// });

// // Thunk for fetching a single product by ID
// export const fetchSingleProduct = createAsyncThunk('products/fetchSingle', async (productId) => {
//   const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
//   return response.data;
// });

// const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllProducts.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchAllProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.allProducts = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchAllProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       })
//       .addCase(fetchSingleProduct.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchSingleProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.singleProduct = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchSingleProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default productsSlice.reducer;
