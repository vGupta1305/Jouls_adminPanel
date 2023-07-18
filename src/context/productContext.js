import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer"

const ProductContext = createContext()

const API = "https://backend-production-e1c2.up.railway.app/api/auth/admin/users"

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts:[],
    isSingleLoading: false,
    singleProduct: {},
    sortedData:[]
}

const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const getProducts = async (url) => {
        dispatch({ type: 'SET_LOADING' })
        try {
            const res = await axios.get(url)
            const products = await res.data
            dispatch({ type: 'SET_API_DATA', payload: products })
        } catch (error){
            dispatch({type:'API_ERROR'})
        }
    }
    

    useEffect(()=>{
        getProducts(API);
    },[])

    return (
        <ProductContext.Provider value={{...state,}} >
            {children}
        </ProductContext.Provider>
    )
}

const useProductContext = ()=>{
    return useContext(ProductContext)
}

export {ProductContext,ProductContextProvider,useProductContext}