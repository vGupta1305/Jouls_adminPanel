import React, { useState } from "react";
import './index.css';
import { Login } from "./login";
import { Register } from "./Register";
import { Box } from "@mui/material";

const Auth = () => {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <>

      <div className="Auth"  >
        <Box
          display="flex"
          borderRadius="3px"
          height={"70px"}
          width={"130px"}
          m={"10px"}
        >

          <img src="./images/logo_2.png" alt="Logo_Image" />
        </Box>
        {
          currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
        }
      </div>
    </>
  );
}

export default Auth