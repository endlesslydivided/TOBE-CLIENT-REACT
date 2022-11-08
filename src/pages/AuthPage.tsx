import { Avatar, Box, Container, Grid, Paper, Typography } from '@mui/material';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import { FC, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { RegisterForm } from '../components/RegisterForm';
import { LoginForm } from '../components/LoginForm';
import { toast } from 'react-toastify';

const theme = createTheme();

type IAuthPageProps = {
  form: 'register' | 'login';
};
  

const AuthPage: FC<IAuthPageProps> = ({form}) => 
{
  const formRef = useRef(null);
  const [inPropRegister, setInPropRegister] = useState(false);
  let { action } = useParams();

  useEffect(() =>
  {
    if(action === 'success')
    {
      toast.success('Почта успешно подтверждена!');
    }
  },[])

  return (
    <ThemeProvider theme={theme}>

        <Grid container component="main" sx={{ height: '100vh',overflowX:'hidden' }}>
          {
            form === 'register' ?
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
    </ThemeProvider>
  );
};

export default AuthPage;

