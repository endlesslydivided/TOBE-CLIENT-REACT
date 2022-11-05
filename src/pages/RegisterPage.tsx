import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../services/AuthService';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';

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
    name: string().min(1,'Full name is required').max(100),
    email: string().min(1,'Email address is required').email('Email Address is invalid'),
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
            console.log(error);
            [... (error as any).data.error].forEach((el: any) =>toast.error(el.message, {position: 'top-right'}))
        }
    }, [isLoading]);

    useEffect(() =>{{isSubmitSuccessful &&  reset()}}, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => 
    {
        registerUser(values);
    };

  return (
    <Container
      maxWidth={false} sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',height: '100vh',backgroundColor: '#2363eb',}}>
      <Box
        sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column',}}
      >
        <Typography textAlign='center' component='h1' 
        sx={{color: '#f9d13e', fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 600, mb: 2, letterSpacing: 1,}}
        >
          Добро пожаловать в ToBe!
        </Typography>
        <Typography component='h2' sx={{ color: '#e5e7eb', mb: 2 }}>
          Зарегистрируйся!
        </Typography>

        <FormProvider {...methods}>
          <Box
            component='form' onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete='off' maxWidth='27rem' width='100%' 
            sx={{backgroundColor: '#e5e7eb',p: { xs: '1rem', sm: '2rem' },borderRadius: 2,}}
          >
            <FormInput name='name' label='Full Name' />
            <FormInput name='email' label='Email' type='email' />
            <FormInput name='password' label='Пароль' type='password' />
            <FormInput name='passwordConfirm' label='Подтвердить пароль'  type='password'/>

            <Typography sx={{ fontSize: '0.9rem', mb: '1rem' }}>
              Уже есть аккаунт?{' '} <LinkItem to='/login'>Войти!</LinkItem>
            </Typography>

            <LoadingButton variant='contained' sx={{ mt: 1 }} fullWidth disableElevation type='submit' loading={isLoading}
            >
              Зарегистрироваться
            </LoadingButton>
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default RegisterPage;
