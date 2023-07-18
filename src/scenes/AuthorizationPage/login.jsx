import React, { useRef, useEffect, useState, useContext } from "react";
import { Box, useTheme } from "@mui/material"
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export const Login = (props) => {

    const nameRef = useRef()
    const errRef = useRef()

    const {setUser } = useContext(AuthContext)

    const theme = useTheme()


    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [name, setName] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        nameRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [name, password])

    const navigate = useNavigate()

    // const formDOM = document.querySelector('.login-form')
    const usernameInputDOM = document.querySelector('.username-input')
    const emailInputDom = document.querySelector('.email-input')
    const passwordInputDOM = document.querySelector('.password-input')


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);
        console.log(name)
        console.log(password)

        setName(usernameInputDOM.value)
        setPass(passwordInputDOM.value)
        setEmail(emailInputDom.value)
        e.preventDefault()

        try {
    
            const { data } = await axios.post('https://backend-production-e1c2.up.railway.app/api/auth/login', { name, email, password })
            reactLocalStorage.set("Authorization", JSON.stringify(data.authtoken))
            if (data?.success) {
                setUser({ loggedIn: true })
                navigate("/")
            }

            console.log(data?.success)

            console.log(data?.authtoken)
            console.log(data)
            console.log('Successfully posted')

            usernameInputDOM.value = ''
            emailInputDom.value = ''
            passwordInputDOM = ''




        } catch (error) {
            // console.log(error.response.data.msg)
            reactLocalStorage.remove('token')
        }

    }


    return (
        <>


            <Box
                {...theme.palette.mode === 'dark' ? (
                    null
                ) : (
                    { color: "black" },
                    {borderColor:"black"}
                )}
                className="auth-form-container">
                <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive" > {errMsg} </p>
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" ref={nameRef} className="email-input" placeholder="youremail@gmail.com" id="email" name="email" />
                    <label htmlFor="username">Username</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="username" className="username-input" placeholder="Enter Your Username" id="username" name="username" />
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPass(e.target.value)} type="password" className="password-input" placeholder="********" id="password" name="password" />

                    <button  type="submit" style={{ marginTop: '5px' }} >Log In</button>
                </form>
                <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>

            </Box>
        </>
    )
}