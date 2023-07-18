import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { NavLink } from 'react-router-dom';
import { Typography, useTheme } from '@mui/material';
import {tokens } from "../theme"

const TableBoody = (curElem) => {

    const { ProductId, Activity_status, Remarks_Of_Activity } = curElem

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <TableRow>
            <TableCell>
                <NavLink
                    style={{ color: colors.primary[100]}}
                    to={`/products/${ProductId}`}
                >
                    <Typography>
                        {ProductId}
                    </Typography>

                </NavLink>
            </TableCell>
            <TableCell>
                {Activity_status}
            </TableCell>
            <TableCell>
                {Remarks_Of_Activity}
            </TableCell>
        </TableRow>



    )
}

export default TableBoody
