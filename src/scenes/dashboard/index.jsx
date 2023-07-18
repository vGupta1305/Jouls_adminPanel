import { Box, Button, IconButton, Typography, useTheme } from "@mui/material"
import { tokens } from "../../theme"
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined"
import StatBox from "../../components/StatBox"
import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined';
import ElectricalServicesOutlinedIcon from '@mui/icons-material/ElectricalServicesOutlined';
import PowerOffOutlinedIcon from '@mui/icons-material/PowerOffOutlined';
import BatteryAlertOutlinedIcon from '@mui/icons-material/BatteryAlertOutlined';
import Header from "../../components/Header"
import { useChargerContext } from "../../context/chargerContext"
import FeatureProductsTable from "../../components/FeatureProductsTable"
// import { NavLink } from "react-router-dom"
import { useMediaQuery } from "@mui/material";
import MapComponent from "../../components/MapComponent";
import ReactPDF from '@react-pdf/renderer';
import { useProductContext } from "../../context/productContext";
import { jsPDF } from 'jspdf'


const Dashboard = () => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    const { liveActivityCountData } = useChargerContext();

    const { products } = useProductContext()

    const {
        totalChargers,
        totalActiveUsers
    } = liveActivityCountData

    const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"))

    const downloadAsPDF = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF();

        // Replace jsonData with your actual JSON data
        const jsonData = products

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



    return (
        <Box className={'container'} m={"20px"} overflowx="hidden">

            {/* HEADER AND DOWNLOAD BUTTON */}

            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} flexWrap={"wrap"} >
                <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />


                <Box>
                    <Button onClick={downloadAsPDF}
                        sx={{
                            backgroundColor: colors.blueAccent[700],
                            color: colors.grey[100], fontSize: "14px",
                            fontWeight: "bold",
                            p: "10px 20px"
                        }}
                    >
                        <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                        Download Reports
                    </Button>
                </Box>
            </Box>


            {/* Grid and Charts */}

            <Box className={'grid-charts'}
                mt={"10px"}
                display={"grid"}
                gridTemplateColumns={isMobile ? `repeat(,1fr)` : `repeat(12,1fr)`}
                gridAutoRows={"105px"}
                gap={"20px"}
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={totalChargers}
                        subtitle="Total Chargers"
                        progress="0.75"
                        increase="+14%"
                        icon={
                            <BatteryChargingFullOutlinedIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={totalActiveUsers}
                        subtitle="Live Chargers"
                        progress="0.50"
                        increase="+21%"
                        icon={
                            <ElectricalServicesOutlinedIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title={totalChargers - totalActiveUsers}
                        subtitle="Inactive Chargers"
                        progress="0.30"
                        increase="+5%"
                        icon={
                            <PowerOffOutlinedIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>
                <Box
                    gridColumn="span 3"
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <StatBox
                        title="1,325,134"
                        subtitle="Traffic Received"
                        progress="0.80"
                        increase="+43%"
                        icon={
                            <BatteryAlertOutlinedIcon
                                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                            />
                        }
                    />
                </Box>

                {/* ROW 2 */}

                <Box
                    gridColumn={"span 6"}
                    gridRow={"span 4"}
                    backgroundColor={colors.primary[400]}
                >
                    <Box
                        mt="25px"
                        p="0 30px"
                        display="flex "
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography
                                variant="h3"
                                fontWeight="600"
                                color={colors.grey[100]}
                            >
                                Total Chargers
                            </Typography>
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                color={colors.greenAccent[500]}
                            >
                                {totalChargers}
                            </Typography>
                        </Box>

                        <Box>
                            {/* <IconButton>
                                <DownloadOutlinedIcon
                                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                                />
                            </IconButton> */}
                        </Box>
                    </Box>

                    <Box
                        height={"400px"}
                        m={"20px 0 0 0"}
                    // backgroundColor={colors.primary[600]}
                    >
                        <FeatureProductsTable />
                    </Box>

                </Box>
                <Box
                    gridColumn={"span 6"}
                    gridRow={"span 4"}
                    backgroundColor={colors.primary[400]}
                >
                    <Box
                        height={"60px"}
                        mt="20px"
                        p="0 30px"
                        display="flex "
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography
                            variant="h3"
                            fontWeight="600"
                            color={colors.grey[100]}>
                            Distribution across India
                        </Typography>

                        <Box>
                            <IconButton>
                                <DownloadOutlinedIcon
                                    sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                                />
                            </IconButton>
                        </Box>
                    </Box>
                    <MapComponent />

                </Box>

            </Box>

        </Box>
    )
}

export default Dashboard
