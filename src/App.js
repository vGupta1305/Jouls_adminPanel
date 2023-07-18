import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom"
import Auth from "./scenes/AuthorizationPage/index";
import Home from "./scenes/Home/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import PageNotFound from "./scenes/global/PageNotFound";
import SingleProduct from "./scenes/SingleProduct/SingleProduct"
import './App.css'
import { GlobalStyle } from "./GlobalStyle";



function App() {

  const [theme, colorMode] = useMode()

  

  return (

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline></CssBaseline>
        <GlobalStyle/>
        <div className="app">
          <main className="content">
            <Routes>
              <Route path="/login" element={<Auth />} />

              <Route element={<ProtectedRoutes />} >
                <Route path="/" element={<Home />} />
                <Route path="/products/:id" element={<SingleProduct/>} />
              </Route>
              <Route path="*" element={<PageNotFound/>}></Route>
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
