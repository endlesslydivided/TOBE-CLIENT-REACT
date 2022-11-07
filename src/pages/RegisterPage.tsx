import { Avatar, Box, Container, Grid, Paper, Typography } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../services/AuthService';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <LinkItem to="#" color="inherit">
        Your Website
      </LinkItem>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: #f9d13e;
  color: #2363eb;
  font-weight: 500;

  &:hover {
    background-color: #ebc22c;
    transform: translateY(-2px);
  }
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: #2363eb;
  &:hover {
    text-decoration: underline;
  }
`;

const registerSchema = object({
    firstName: string().min(1,'First name is required').max(50),
    username: string().min(1,'Username is required').max(25),
    email: string().min(1,'Email address is required').email('Email Address is invalid'),
    lastName: string().min(1,'Last name is required').max(50),
    phoneNumber: string().min(1,'Phone number is required').max(12),
    password: string().min(1,'Password is required').min(8, 'Password must be more than 8 characters').max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string().min(1,'Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, 
{
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const RegisterPage = () => 
{
    const methods = useForm<RegisterInput>({resolver: zodResolver(registerSchema),});

    const [registerUser, { isLoading, isSuccess, error, isError }] = useRegisterMutation();

    const navigate = useNavigate();

    const {reset,handleSubmit,formState: { isSubmitSuccessful }} = methods;

    useEffect(() => 
    {
        if (isSuccess) 
        {
            toast.success('User registered successfully');
            navigate('/verifyemail');
        }

        if (isError) 
        {
          if (Array.isArray((error as any).data.error)) 
          {
              (error as any).data.error.forEach((el: any) =>toast.error(el.message, {position: 'top-right',}));
          } 
          else 
          {
              toast.error((error as any).data.message, {position: 'top-right',});
          }
        }
    }, [isLoading]);

    useEffect(() =>{{isSubmitSuccessful &&  reset()}}, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => 
    {     
      registerUser(values);
    };



  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid item xs={false} sm={4} md={7} 
        sx={{backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box sx={{my: 8,mx: 4,display: 'flex',flexDirection: 'column',alignItems: 'center',}} >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              
            </Avatar>

            <Typography component="h1" variant="h5">
              Зарегистрируйся
            </Typography>


              <FormProvider {...methods}>
                <Box component='form'  onSubmit={handleSubmit(onSubmitHandler)}  noValidate  autoComplete='off' maxWidth='27rem'  width='100%'>

                  <Grid container>

                    <Grid item xs={6} md={6}>
                      <FormInput name='firstName' label='Имя' type='text' />
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <FormInput name='lastName' label='Фамилия' type='text' />
                    </Grid>

                  </Grid>
                
                  <FormInput name='email' label='Email' type='email' />
                  <FormInput name='phoneNumber' label='Номер телефона' type='text'  />
                  <FormInput name='username' label='Никнейм' type='text' />

                  <FormInput name='password' label='Пароль' type='password' />
                  <FormInput name='passwordConfirm' label='Подтвердить пароль'  type='password' />

                  <LoadingButton variant='contained' sx={{ mt: 1 }} fullWidth disableElevation type='submit' loading={isLoading}>
                    Зарегистрироваться
                  </LoadingButton>  

                </Box>
              </FormProvider>

              <Grid container>

                <Grid item>
                  <Typography sx={{ fontSize: '0.9rem', mb: '1rem',justifySelf:'center'}}>
                    Уже есть аккаунт?{' '} <LinkItem to='/login'>Войти!</LinkItem>
                  </Typography>
                </Grid>      

              </Grid>

              <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default RegisterPage;

