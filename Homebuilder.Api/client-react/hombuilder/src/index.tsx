import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Header } from './layouts/pageLayout/shared/header/Header';
import "./styles.scss"
import { AppNavigation } from './navigation/Navigation';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <ToastContainer />
      <Header></Header>
      <AppNavigation />
    </React.StrictMode>
  </BrowserRouter>
);
