import { Avatar, Box, Container, FormControlLabel, Grid, InputAdornment, Paper, Radio, Typography } from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../services/AuthApiSlice';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { Add, Label } from '@mui/icons-material';


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

const registerSchema = object({
    sex: string().min(1,'Необходимо ввести пол').max(10),
    city: string().min(1,'Необходимо ввести город').max(100,'Поле "Город" должно содержать не больше 100 символов'),
    country: string().min(1,'Необходимо ввести страну').max(50,'Поле "Страна" должно содержать не больше 50 символов'),
    firstName: string().min(1,'Необходимо ввести имя').max(50,'Поле "Имя" должно содержать не больше 50 символов'),
    email: string().min(1,'Необходимо ввести адрес электронной почты').email('Адрес электронной почты не валиден'),
    lastName: string().min(1,'Необходимо ввести фамилию').max(50,'Поле "Фамилия" должно содержать не больше 50 символов'),
    phoneNumber: string().min(1,'Необходимо ввести номер телефона').max(12,'Поле "Номер телефона" должно содержать не больше 12 символов'),
    password: string().min(1,'Необходимо ввести пароль').min(8, 'Пароль должен быть длиннее 8 символов').max(32, 'Пароль должен быть короче 32 символов'),
    passwordConfirm: string().min(1,'Подтвердите пароль'),
}).refine((data) => data.password === data.passwordConfirm, 
{
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
});

export type RegisterInput = TypeOf<typeof registerSchema>;

export function RegisterForm() {

    const methods = useForm<RegisterInput>({resolver: zodResolver(registerSchema),});
    const {reset,handleSubmit,formState: { isSubmitSuccessful }} = methods;

    const [registerUser, { isLoading, isSuccess, error, isError }] = useRegisterMutation();
    const navigate = useNavigate();

    useEffect(() => 
    {
        if (isSuccess) 
        {
          toast.success('Пользователь зарегистрирован успешно');
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

    useEffect(() =>{{isSubmitSuccessful && isSuccess &&  reset()}}, [isSubmitSuccessful,isSuccess]);

    const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => 
    {     
      registerUser(values);
    };

    return (
    <Grid sx={{alignContent:'center',justifyContent:'center',display:'flex'}} item xs={12} sm={8} md={5} component={Paper}  elevation={6}>
      <Box sx={{my: 0,mx: 4,display: 'flex',flexDirection: 'column',alignItems: 'center', justifyContent:'center'}} >
			  <Avatar sx={{ mb: 1, bgcolor: 'primary.main' }}>
				
			  </Avatar>

        <Typography component="h1" variant="h4" sx={{ mb: 3}}>
          Зарегистрируйся
        </Typography>
      
        <FormProvider {...methods}>
          <Box component='form'  onSubmit={handleSubmit(onSubmitHandler)}  noValidate  autoComplete='off' maxWidth='27rem'  width='100%'>

            <Grid container spacing={0.5} sx={{mb:0.5}}>

              <Grid item xs={6} md={6}>
                <FormInput name='firstName' label='Имя' type='text'   />
              </Grid>

              <Grid item xs={6} md={6} >
                <FormInput name='lastName' label='Фамилия' type='text'  />
              </Grid>

            </Grid>

            <Grid container spacing={0.5} sx={{mb:0.5}}>

              <Grid item xs={6} md={6}>
                <FormInput name='country' label='Страна' type='text' margin='none'    />
              </Grid>

              <Grid item xs={6} md={6}>
                <FormInput name='city' label='Город' type='text'   />
              </Grid>

            </Grid>
          
            <FormInput name='email' label='Email' type='email' sx={{mb:0.5}}  />
            <FormInput name='phoneNumber' label='Номер телефона' sx={{mb:0.5}}   type='text' startAdornment={
               <InputAdornment position='start'>
                <Add/>
              </InputAdornment>
              }/>

            <FormInput name='password' label='Пароль' type='password'   sx={{mb:0.5}} />
            <FormInput name='passwordConfirm' label='Подтвердить пароль' sx={{mb:0.5}} type='password'  />
            <FormInput name='sex' type='radio' label="Пол" sx={{mb:0.5}}>
              <FormControlLabel value="Мужской" control={<Radio />} label="Мужской" />
              <FormControlLabel value="Женский" control={<Radio />} label="Женский" />
            </FormInput>

            <LoadingButton variant='contained' sx={{ mt: 1}} fullWidth disableElevation type='submit' loading={isLoading}>
              Зарегистрироваться
            </LoadingButton>  

          </Box>
        </FormProvider>

        <Typography sx={{ fontSize: '0.9rem', mt: 3,justifySelf:'center'}}>
          Уже есть аккаунт?{' '} <LinkItem to='/login'>Войти!</LinkItem>
        </Typography>

            {/* <Copyright sx={{ mt: 'auto' }} /> */}
      </Box>
    </Grid>
    )
}