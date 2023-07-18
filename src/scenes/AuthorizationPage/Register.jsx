import React, { useState } from "react";
import axios from "axios";
import {reactLocalStorage} from 'reactjs-localstorage';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [name, setName] = useState('');


    
    const formDOM = document.querySelector('.register-form')
    const usernameInputDOM = document.querySelector('.username-input')
    const emailInputDom = document.querySelector('.email-input')
    const passwordInputDOM = document.querySelector('.password-input')


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(name)
        console.log(password)



        if (formDOM) {
            formDOM.addEventListener('submit', async (e) => {
    
                setName(usernameInputDOM.value)
                setPass(passwordInputDOM.value)
                setEmail(emailInputDom.value)
                e.preventDefault()
    
                try {
                    // debugger;
                    const {data} = await axios.post('https://backend-production-e1c2.up.railway.app/api/auth/createuser',{name,email,password})
                    // localStorage.setItem('token', data.authtoken)
                    reactLocalStorage.set("Authorization", JSON.stringify(data.authtoken));
                    console.log(data.authtoken)
                    console.log(data)
                    console.log('Successfully posted')
    
                    usernameInputDOM.value=''
                    emailInputDom.value=''
                    passwordInputDOM=''
    
                } catch (error) {
                    // console.log(error.response.data.msg)
                    reactLocalStorage.remove('token')
                }
    
            })
        }
    }

    

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
            <label htmlFor="name">Username</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)}  className="username-input" id="name" placeholder="full Name" />
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" className="email-input" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPass(e.target.value)} className="password-input"  type="password" placeholder="********" id="password" name="password" />
            <button style={{marginTop:'5px'}} type="submit">Register</button>
        </form>
        <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
    </div>
    )
}