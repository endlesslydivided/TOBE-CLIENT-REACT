import { Avatar, Box, Container, Grid, Paper, Typography } from '@mui/material';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import { FC, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { RegisterForm } from '../components/RegisterForm';
import { LoginForm } from '../components/LoginForm';
import { toast } from 'react-toastify';
import { REGISTRATION_ROUTE } from '../utils/consts';

const UnauthorizePage = () => {

  let { action } = useParams();
  const location = useLocation();

  useEffect(() =>
  {
    if(action === 'success')
    {
      toast.success('Почта успешно подтверждена!');
    }
  },[])

  return (
    <>
        <Grid container component="main" sx={{ height: '100vh',overflowX:'hidden' }}>
          {
            location.pathname === REGISTRATION_ROUTE ?
            <>
              <Grid item xs={false} sm={4} md={7} 
              sx={{backgroundImage: 'url(https://source.unsplash.com/random)',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
              }}
              />
              <RegisterForm/>
            </>
            :
            <>
              <LoginForm/>
              <Grid item xs={false} sm={4} md={7} 
              sx={{backgroundImage: 'url(https://source.unsplash.com/random)',
                  backgroundRepeat: 'no-repeat',
                  backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
              }}
              />           
            </>
          }
            
        </Grid>
      <Box
        sx={{backgroundColor: '#ece9e9',mt: '2rem',height: '15rem',display: 'flex',alignItems: 'center',justifyContent: 'center',}}
      >
        <Typography variant='h2' component='h1' sx={{ color: '#1f1e1e', fontWeight: 500 }}>
          Unauthorized Page
        </Typography>
      </Box>
    </>
  );
};

export default UnauthorizePage;

