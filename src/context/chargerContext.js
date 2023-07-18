import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/chargerReducer"

const chargerContext = createContext()

const API = "https://backend-production-e1c2.up.railway.app/api/auth/admin/chargers"

const initialState ={
    isLoading:false,
    isError: false,
    liveActivityCountData :[],
}

const ChargerContextProvider = ({children})=>{
    const [state,dispatch] = useReducer(reducer,initialState)

    const getLiveActivityCount = async(url)=>{
        dispatch({ type: 'SET_LOADING' })
        try {
            const res = await axios.get(url)
            const info = await res.data
            dispatch({ type: 'SET_LIVE_ACTIVITY_COUNT_DATA', payload: info })
        } catch (error) {
            dispatch({type:'API_ERROR'})
        }
    }

    useEffect(()=>{
        getLiveActivityCount(API)
    },[])

    return (
        <chargerContext.Provider value={{...state}}>
            {children}
        </chargerContext.Provider>
    )
}

const useChargerContext = ()=>{
    return useContext(chargerContext)
}

export {chargerContext, useChargerContext, ChargerContextProvider}