const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      
      let priceArr = action.payload.map((curElem) => curElem.price);
      // console.log(priceArr);

      // first way to get max value from array
      // console.log(Math.max.apply(null,priceArr));

      // Second Way 
      // let maxPrice = priceArr.reduce((initialVal, curVal) => Math.max(initialVal, curVal), 0);
      // console.log(maxPrice);

      // Third Way 
      let maxPrice = Math.max(...priceArr);
      // console.log(maxPrice);

      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, price: maxPrice, maxPrice: maxPrice}
      };

    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };

    case "SET_LIST_VIEW":
      return {
        ...state,
        grid_view: false,
      };

    case "GET_SORT_VALUE":
      // let userSortValue = document.getElementById("sort");
      // let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
      return {
        ...state,
        // sorting_value: sort_value,
        sorting_value: action.payload,
      };

    case "SORTING_PRODUCTS":
      // let newSortData;
      // let tempSortProduct = [...action.payload];
      // if(state.sorting_value === "lowest") {
      //   const sortingProducts = (a,b) => {
      //      return a.price-b.price
      //   }  
      //   newSortData = tempSortProduct.sort(sortingProducts)
      // }
      // if(state.sorting_value === "a-z") {
      //   newSortData = tempSortProduct.sort((a,b) => a.name.localeCompare(b.name))
      // }
      // if(state.sorting_value === "z-a") {
      //   newSortData = tempSortProduct.sort((a,b) => b.name.localeCompare(a.name))
      // }
      
      // Do Not Repeat Yourself vala concept hai ye
      let newSortData;
      const { filter_products, sorting_value } = state;
      let tempSortProduct = [...filter_products];

      const sortingProducts = (a, b) => {
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
      };

      newSortData = tempSortProduct.sort(sortingProducts);

      return {
        ...state,
        filter_products: newSortData,
      };

    case "UPDATE_FILTERS_VALUE" : 
      const {name, value} = action.payload;
      
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value, // yha name mera text attribute hai jaise hi me color, category ke option par click karunga to mere text attribute ki value change ho jayegi 
          // text: value, // upar vali line ka mtlb ye hai 
        }
      }

      case "FILTER_PRODUCTS":
        let { all_products } = state;
        let tempFilterProduct = [...all_products];
  
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

        if (price === 0) {
          tempFilterProduct = tempFilterProduct.filter(
            (curElem) => curElem.price === price
          );
        } else {
          tempFilterProduct = tempFilterProduct.filter(
            (curElem) => curElem.price <= price
          );
        }

        return {
          ...state,
          filter_products: tempFilterProduct,
        };
  
        case "CLEAR_FILTERS":
          return {
            ...state,
            filters: {
              ...state.filters,
              text: "",
              category: "all",
              company: "all",
              color: "all",
              maxPrice: 0,
              price: state.filters.maxPrice,
              minPrice: state.filters.maxPrice,
            },
          };
          
    default:
      return state;
  }
};

export default filterReducer;


// -------------------------------------------------------------

// Exp - 1

// <input type="text" name="text" placeholder="Search" value={text} onChange={updateFilterValue}/> 
// name = event.target.name; // name = "text"
// value = event.target.value; // value = "jo bhi type hoga input box me vo yha mil jayega"
// filters: {
//   [name]: value, // yha name mera text attribute hai jaise hi me color, category ke option par click karunga to mere text attribute ki value change ho jayegi 
//   text: value, // upar vali line ka mtlb ye hai 
// }

// Exp - 2
// let key = "address";
// const user = {
//   name: 'peter',
//   [key]: 'noida,up,india'
// };
// console.log(user); // {address: "noida,up,india", name:'peter'}