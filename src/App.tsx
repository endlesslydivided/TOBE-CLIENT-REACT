import React from 'react';
import {Routes, Route} from 'react-router-dom'
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import AppRouter from './components/AppRouter';
import 'react-toastify/dist/ReactToastify.min.css';
import ThemeProvider from './theme';
function App() {
  
  return (
    <ThemeProvider>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        />
      <AppRouter/>
    </ThemeProvider>
  );
}
export default App;
