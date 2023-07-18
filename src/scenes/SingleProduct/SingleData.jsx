import React from 'react'

const SingleData = (singleData) => {

    const { _id,
        name,
        email,
        __v,
        Activity_status,
        BoughtStatus,
        Remarks_Of_Activity,
        ProductId } = singleData

    return (
        <div>
            {_id}
            {name}
            {email}
            {__v}
            {Activity_status}
            {BoughtStatus}
            {Remarks_Of_Activity}
            {ProductId}
        </div>
    )
}

export default SingleData
