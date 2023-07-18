import React, { useState, useContext } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import LogOutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { reactLocalStorage } from 'reactjs-localstorage';
import { tokens, ColorModeContext } from '../theme';
import { Box, Button, IconButton, useTheme } from "@mui/material"


const Nav = () => {
    const [menuIcon, setMenuIcon] = useState();


    const currentUser = reactLocalStorage.get("Authorization")
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const colorMode = useContext(ColorModeContext)

    const navigate = useNavigate()

    const handleLogOut = async () => {
        navigate('/login')
        reactLocalStorage.remove("Authorization")
    }


    const Nav = styled.nav`
    .navbar-lists {
      display: flex;
      gap: .8rem;
      align-items: center;
      list-style: none;

      .navbar-link {
        &:link,
        &:visited {
          display: inline-block;
          text-decoration: none;
          font-size: 1.8rem;
          font-weight: 500;
          text-transform: uppercase;
          color: ${colors.primary[100]};
          transition: color 0.3s linear;
        }

        &:hover,
        &:active {
          color: ${colors.greenAccent[100]};
        }
        .icon{
            /* font-size: 4rem; */
            opacity: 0.8;
        }
      }
      
    }

    .mobile-navbar-btn {
      display: none;
      background-color: transparent;
      cursor: pointer;
      border: none;
    }

    .mobile-nav-icon[name="close-outline"] {
      display: none;
    }

    .close-outline {
      display: none;
    }

    .user-login--name {
      text-transform: capitalize;
    }

    .user-logout,
    .user-login {
      font-size: 1.4rem;
      padding: 0.8rem 1.4rem;
    }

    @media (max-width: ${theme.media.mobile}) {
      .mobile-navbar-btn {
        display: inline-block;
        z-index: 9999;
        border: ${colors.primary[100]};

        .mobile-nav-icon {
          font-size: 2.1rem;
          color: ${colors.primary[100]};
        }
      }

      .navbar{
        position: unset;
      }

      .active .navbar{
        background-color: ${colors.primary[500]};
      }

      .active .mobile-nav-icon {
        display: none;
        font-size: 2.1rem;
        position: absolute;
        top: 30%;
        right: 10%;
        color: ${colors.primary[100]};
        z-index: 9999;
      }

      .active .close-outline {
        display: inline-block;
      }

      .navbar-lists {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        background-color: ${colors.primary[500]};

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        visibility: hidden;
        opacity: 0;
        transform: translateX(100%);
        /* transform-origin: top; */
        /* transition: all 3s linear; */
      }

      .active .navbar-lists {
        position: absolute;
        visibility: visible;
        opacity: 1;
        transform: translateX(0);
        z-index: 999;
        transform-origin: right;
        /* transition: all 3s linear; */

        .navbar-link {
          font-size: 4.2rem;
        }
      }

      .user-logout,
      .user-login {
        font-size: 2.2rem;
        padding: 0.8rem 1.4rem;
      }
    }
  `;

    return (
        <Nav>
            <div className={menuIcon ? "navbar active" : "navbar"}>
                <ul className="navbar-lists">
                    <li>
                        <NavLink
                            className="navbar-link "
                            onClick={() => setMenuIcon(false)}>
                            <IconButton onClick={colorMode.toggleColorMode} >
                                {theme.palette.mode === 'dark' ? (
                                    <LightModeOutlinedIcon className='icon' />
                                ) : (
                                    <DarkModeOutlinedIcon className='icon'  />
                                )}
                            </IconButton>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            // to="/about"
                            className="navbar-link "
                            onClick={() => setMenuIcon(false)}>
                            <IconButton  >
                                <NotificationsOutlinedIcon className='icon'  />
                            </IconButton>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            // to="/products"
                            className="navbar-link "
                            onClick={() => setMenuIcon(false)}>
                            <IconButton>
                                <SettingsOutlinedIcon className='icon'  />
                            </IconButton>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            // to="/contact"
                            className="navbar-link "
                            onClick={() => setMenuIcon(false)}>
                            <IconButton>
                                <PersonOutlinedIcon  className='icon' />
                            </IconButton>
                        </NavLink>
                    </li>
                    {/* <li>
            <NavLink to="/cart" className="navbar-link cart-trolley--link">
              <FiShoppingCart className="cart-trolley" />
              <span className="cart-total--item"> {total_item} </span>
            </NavLink>
          </li> */}
                    {/* <li>
            
          </li> */}
                    <li>
                        {currentUser && <NavLink to="/login" className="navbar-link" >
                            <LogOutOutlinedIcon className='icon'  onClick={handleLogOut} >Log Out</LogOutOutlinedIcon>
                        </NavLink>}
                    </li>
                </ul>

                {/* two button for open and close of menu */}
                <div className="mobile-navbar-btn">
                    <MenuOutlinedIcon
                        name="menu-outline"
                        className="mobile-nav-icon"
                        onClick={() => setMenuIcon(true)}
                    />
                    <CloseOutlinedIcon
                        name="close-outline"
                        className="mobile-nav-icon close-outline"
                        onClick={() => setMenuIcon(false)}
                    />
                </div>
            </div>
        </Nav>
    );
};

export default Nav;
