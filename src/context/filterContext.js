import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from './productContext'
import reducer from '../reducer/filterReducer'

const FilterContext = createContext()

const initailState = {
  all_products: [],
  filter_products: [],
  filters: {
    searchTerm: '',
    filterStatus: 'all',
  }

}

export const FilterContextProvider = ({ children }) => {
  const { featureProducts } = useProductContext()

  const [state, dispatch] = useReducer(reducer, initailState)


  const updateSearchValue=(name)=>{
    return dispatch({type:'UPDATE_SEARCH_VALUE', payload:{name}})
  }

  const updateFilterValue = (value) => {
    return dispatch({ type: "UPDATE_FILTERS_VALUE", payload: { value } });
  };

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
  }, [featureProducts, state.sorting_value, state.filters]);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: featureProducts });
  }, [featureProducts]);


  return (
    <FilterContext.Provider
      value={{
        ...state,
        updateFilterValue,
        updateSearchValue
      }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};

