import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from "./context/AuthContext"
import { ProductContextProvider } from './context/productContext';
import { ChargerContextProvider } from './context/chargerContext';
import { FilterContextProvider } from './context/filterContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductContextProvider>
        <FilterContextProvider>
          <ChargerContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ChargerContextProvider>
        </FilterContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);