import React from 'react';
import {Routes, Route} from 'react-router-dom'
import { HomePage } from './pages/HomePage';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import AppRouter from './components/AppRouter';

function App() {
  
  return (
    <>
      <CssBaseline/>
      <ToastContainer/>
      <AppRouter/>
    </>
  );
}
export default App;
