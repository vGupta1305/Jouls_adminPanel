import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from "react"
import { useProductContext } from "../context/productContext"
import { NavLink } from 'react-router-dom';
import { MenuItem, Select, Box, Typography, useTheme, TablePagination,IconButton } from '@mui/material';
import { tokens } from "../theme"
import { TextField, Button } from '@mui/material';
import { FormControl } from '@mui/material';
import { jsPDF } from 'jspdf'
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import { useFilterContext } from '../context/filterContext';


const FeatureProductTable = () => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)


    const { isLoading, featureProducts } = useProductContext()

    const {
        filters: { searchTerm, filterStatus},
        updateFilterValue,
        updateSearchValue,
        filter_products:filteredData
      } = useFilterContext();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    // const [searchTerm, setSearchTerm] = useState('');
    // const [filterStatus, setFilterStatus] = useState('all');
    const [sortedField, setSortedField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSearch = (event) => {
        updateSearchValue(event.target.value);
    };

    const handleFilterChange = (event) => {
        updateFilterValue(event.target.value);
    };

    const handleSort = (field) => {
        if (sortedField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortedField(field);
            setSortDirection('asc');
        }
    };



    // now the filtering is happening in filterContext so the filterProducts can be accessed from anywhere

    // Filter the data based on the search term
    // const filteredData = featureProducts
    //     .filter((item) =>
    //         item?.ProductId?.toLowerCase().includes(searchTerm.toLowerCase())      // ? is the reason that the products with no product ID will not be displayed
    //         // item.ProductId?.toLowerCase().includes(searchTerm.toLowerCase())
    //     )
    //     .filter((item) => {
    //         if (filterStatus === 'all') {
    //             return true
    //         }
    //         else if (filterStatus === 'active') {
    //             return item.Activity_status === "true"
    //         }
    //         else {
    //             return item.Activity_status === "false"
    //         }
    //     })

    // Sort the filtered data based on the sorted field and direction
    const sortedData = filteredData.sort((a, b) => {
        if (sortDirection === 'asc') {
            return a[sortedField] > b[sortedField] ? 1 : -1;
        } else {
            return a[sortedField] < b[sortedField] ? 1 : -1;
        }
    });


    const downloadAsPDF = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Replace jsonData with your actual JSON data
        const jsonData = sortedData

        const jsonString = JSON.stringify(jsonData, null, 2); // Add indentation of 2 spaces

        const contentType = 'application/json';

        const margin = 10;
        const maxWidth = doc.internal.pageSize.getWidth() - margin * 2;
        const lineHeight = 12;

        // Split the JSON string into an array of lines
        const lines = doc.splitTextToSize(jsonString, maxWidth);

        let cursorY = margin;

        // Add each line to the PDF document, handling pagination
        lines.forEach((line, i) => {
            if (cursorY + lineHeight > doc.internal.pageSize.getHeight()) {
                doc.addPage();
                cursorY = margin;
            }
            doc.text(margin, cursorY, line);
            cursorY += lineHeight;
        });

        // Save the PDF file
        doc.save('data.pdf');
    };


    if (isLoading) {
        return <div>
            ....Loading
        </div>
    }



    return (
        <Box width={"100%"} overflow={'hidden'} >
            <Box display={'flex'} justifyContent={'space-between'} >
                <Box>

                    <TextField
                        label="Search"
                        value={searchTerm}
                        onChange={handleSearch}
                    />

                    <FormControl>
                        <Select value={filterStatus} 
                        onChange={handleFilterChange}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>

                </Box>

                <IconButton sx={{paddingRight:"2rem"}} onClick={downloadAsPDF} >
                    <DownloadOutlinedIcon
                        sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                    />
                </IconButton>

            </Box>


            <TableContainer sx={{ maxHeight: 300 }} >
                <Table stickyHeader >
                    <TableHead sx={{ backgroundColor: colors.greenAccent[500] }} >
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell >Status</TableCell>
                            <TableCell >Remarks</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {sortedData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((curElem) => {
                                return (
                                    <>
                                        <TableRow
                                            key={curElem?.ProductId}
                                        >
                                            <TableCell>
                                                <NavLink style={{ color: colors.primary[100] }} to={`/products/${curElem.ProductId}`} >
                                                    <Typography variant='h6' >
                                                        {curElem?.ProductId}
                                                    </Typography>
                                                </NavLink>

                                            </TableCell>
                                            <TableCell>
                                                {curElem?.Activity_status === "true" ? "Active" : "Inactive"}
                                            </TableCell>
                                            <TableCell>
                                                {curElem?.Notifications}
                                            </TableCell>

                                        </TableRow>
                                    </>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={sortedData?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}  // Remove the empty function call parentheses
                onRowsPerPageChange={handleChangeRowsPerPage}  // Remove the empty function call parentheses
            />
        </Box>
    )
}

export default FeatureProductTable