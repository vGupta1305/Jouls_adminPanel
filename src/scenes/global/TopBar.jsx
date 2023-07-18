import { Box} from "@mui/material"
import { NavLink } from "react-router-dom"
import Nav from "../../components/Nav"


const TopBar = () => {

    return (
        <Box display="flex" alignItems={"center"} justifyContent="space-between" p={2} >

            {/* Search Bar  */}


            <Box
                display="flex"
                borderRadius="3px"
                height={"70px"}
                width={"130px"}
                ml={"15px"}
            >
                <NavLink to="/">
                    <img src="./images/logo_2.png" alt="Logo_Image" />
                </NavLink>
            </Box>

            {/* <Box
                display="flex"
                backgroundColor={colors.primary[400]}
                borderRadius="3px"
            >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder='Search'></InputBase>
                <IconButton type="button" sx={{ p: 1 }} >
                    <SearchIcon></SearchIcon>
                </IconButton>

            </Box> */}


            {/* Icons */}
            
            <Nav/>

            {/* <Box display="flex" alignItems={"center"} >
                <IconButton onClick={colorMode.toggleColorMode} >
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>

                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>

                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>

                <IconButton>
                    <PersonOutlinedIcon />
                </IconButton>

                <IconButton>

                    <NavLink to='/login' >
                        <LoginOutlinedIcon />
                    </NavLink>

                </IconButton>

            </Box> */}


        </Box>
    )
}

export default TopBar