import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '../components/FormInput';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingButton as _LoadingButton } from '@mui/lab';
import { toast } from 'react-toastify';
import { useVerifyEmailMutation } from '../services/AuthService';

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

const verificationCodeSchema = object({verificationCode: string().min(1, 'Verification code is required')});

export type VerificationCodeInput = TypeOf<typeof verificationCodeSchema>;

const EmailVerificationPage = () => 
{
    const { verificationCode } = useParams();

    const methods = useForm<VerificationCodeInput>({resolver: zodResolver(verificationCodeSchema)});
    const {reset,handleSubmit,formState: { isSubmitSuccessful }} = methods;

    const [verifyEmail, { isLoading, isSuccess, data, isError, error }] = useVerifyEmailMutation();

    const navigate = useNavigate();

    useEffect(() => {{verificationCode && reset({ verificationCode })}}, []);

    useEffect(() => {{isSubmitSuccessful && reset()}}, [isSubmitSuccessful]);

    useEffect(() => {
        if (isSuccess) 
        {
            toast.success(data?.message);
            navigate('/login');
        }
        if (isError) 
        {
            [...(error as any).data.error].forEach((el: any) =>toast.error(el.message, {position: 'top-right',}));
        }
    }, [isLoading]);

    const onSubmitHandler: SubmitHandler<VerificationCodeInput> = ({verificationCode,}) =>{verifyEmail({ verificationCode });};

    return (
    <Container maxWidth={false} sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',minHeight: '100vh',backgroundColor: '#2363eb'}}>
        <Box sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column',}}>
            <Typography textAlign='center' component='h1'
            sx={{color: '#f9d13e',fontWeight: 600,fontSize: { xs: '2rem', md: '3rem' },mb: 2,letterSpacing: 1,}}>
            Подтвреждение почты
            </Typography>

            <FormProvider {...methods}>
                <Box component='form' onSubmit={handleSubmit(onSubmitHandler)} noValidate autoComplete='off' maxWidth='27rem' width='100%' 
                    sx={{backgroundColor: '#e5e7eb',p:{ xs: '1rem', sm: '2rem' },borderRadius: 2}}
                >
                    <FormInput name='verificationCode' label='Verification Code' />
                    
                    <LoadingButton variant='contained' sx={{ mt: 1 }} fullWidth disableElevation type='submit' loading={isLoading}>
                    Подтвердить почту
                    </LoadingButton>

                </Box>
            </FormProvider>
        </Box>
    </Container>
    );
};

export default EmailVerificationPage;
