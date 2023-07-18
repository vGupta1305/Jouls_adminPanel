import React from 'react'
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useProductContext } from '../../context/productContext'
import SingleData from './SingleData'

const SingleProduct = () => {

    const {id}= useParams()

    const {featureProducts}=useProductContext()
    // console.log(featureProducts)
    const singleProduct= featureProducts.filter((curElm)=>curElm.ProductId===id
    )
    console.log(singleProduct)

    const{
        _id,
        name,
        email,
        Activity_status,
        BoughtStatus,
        Charging_mode,
        Input_current,
        Input_voltage,
        Notifications,
        Output_current,
        Output_voltage,
        ProductId,
        city,
        state
    }= singleProduct[0]

    console.log(singleProduct[0])

    

    return (
        <Box>
            
           {id}
           {singleProduct.name}
           {email}
           {Activity_status}
           {BoughtStatus}
        </Box>
    )
}

export default SingleProduct