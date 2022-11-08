import { Avatar, Box, Container, Grid, Paper, Typography } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../services/AuthService';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <LinkItem to="#" color="inherit">
        endlesslydivided
      </LinkItem>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const LoadingButton = styled(_LoadingButton)`
  padding: 0.6rem 0;
  background-color: black;
  color: white;
  font-weight: 500;

  &:hover {
    background-color: grey;
    transform: translateY(-2px);
  }
`;

const LinkItem = styled(Link)`
  text-decoration: none;
  color: grey;
  &:hover {
    text-decoration: underline;
  }
`;

const loginSchema = object({
    email: string().min(1,'Email address is required').email('Email Address is invalid'),
    password: string().min(1,'Password is required').min(8, 'Password must be more than 8 characters').max(32, 'Password must be less than 32 characters'),
});

export type LoginInput = TypeOf<typeof loginSchema>;

export function LoginForm() {

    const methods = useForm<LoginInput>({resolver: zodResolver(loginSchema),});

    const [loginUser, { isLoading, isSuccess, error, isError }] = useLoginMutation();


    const {reset,handleSubmit,formState: { isSubmitSuccessful }} = methods;

    const navigate = useNavigate();
    const location = useLocation();

    const from = ((location.state as any)?.from.pathname as string) || '/profile';

    useEffect(() => 
    {
        if (isSuccess) 
        {
            navigate(from);
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

    const onSubmitHandler: SubmitHandler<LoginInput> = (values) => 
    {     
        loginUser(values);
    };
    return (
        <Grid sx={{alignContent:'center',justifyContent:'center',display:'flex'}} item xs={12} sm={8} md={5} component={Paper}  elevation={6}>
        <Box sx={{my: 0,mx: 4,display: 'flex',flexDirection: 'column',alignItems: 'center', justifyContent:'center'}} >
          <Avatar sx={{ mb: 1, bgcolor: 'primary.main' }}>
            
          </Avatar>

          <Typography component="h1" variant="h4" sx={{ mb: 3}}>
            Добро пожаловать!
          </Typography>
          <Typography component="h5" sx={{ mb: 3, color:'grey'}}>
            Войти в аккаунт!
          </Typography>

            <FormProvider {...methods}>
              <Box component='form'  onSubmit={handleSubmit(onSubmitHandler)}  noValidate  autoComplete='off' maxWidth='27rem'  width='100%'>
              
                <FormInput name='email' label='Email' type='email'/>

                <FormInput name='password' label='Пароль' type='password'   />

                <LoadingButton variant='contained' sx={{ mt: 1 }} fullWidth disableElevation type='submit' loading={isLoading}>
                  Войти
                </LoadingButton>  

              </Box>
            </FormProvider>

            <Typography sx={{ fontSize: '0.9rem', mt: 3,justifySelf:'center'}}>
              Нет аккаунта?{' '} <LinkItem to='/register'>Зарегистрируйся!</LinkItem>
            </Typography>

        </Box>
      </Grid>
    )
}