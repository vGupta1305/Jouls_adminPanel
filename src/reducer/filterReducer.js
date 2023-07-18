const filterReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_FILTER_PRODUCTS":
            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filters: {
                    ...state.filters
                }
            }


        case "UPDATE_SEARCH_VALUE":
            const { name } = action.payload;
            return {
                ...state,
                filters: {
                    ...state.filters,
                    searchTerm: name,
                }
            }



        case "UPDATE_FILTERS_VALUE":
            const { value } = action.payload;
            return {
                ...state,
                filters: {
                    ...state.filters,
                    filterStatus: value,
                }
            }

        case 'FILTER_PRODUCTS':
            let { all_products } = state;
            let tempFilterProduct = [...all_products]


            const { searchTerm, filterStatus } = state.filters;

            if (searchTerm) {
                tempFilterProduct = tempFilterProduct.filter((curElm) => {
                    return curElm?.ProductId?.toLowerCase().includes(searchTerm.toLowerCase())
                })
            }

            if (filterStatus !== "all") {
                if (filterStatus === 'active') {
                    tempFilterProduct = tempFilterProduct.filter(
                        (curElem) => curElem.Activity_status === 'true'
                    )
                }
                if (filterStatus === 'inactive') {
                    tempFilterProduct = tempFilterProduct.filter(
                        (curElem) => curElem.Activity_status === 'false'
                    )
                }
            }
            return {
                ...state,
                filter_products: tempFilterProduct,
            }
        default:
            return state;
    }
}


export default filterReducer