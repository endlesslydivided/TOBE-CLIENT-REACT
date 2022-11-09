import { Box, Container, Typography } from '@mui/material';
import { LoadingButton as _LoadingButton } from '@mui/lab';


const EmailVerificationPage = () => 
{

    return (
    <Container maxWidth={false} sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',minHeight: '100vh',backgroundColor: '#2363eb'}}>
        <Box sx={{display: 'flex',justifyContent: 'center',alignItems: 'center',flexDirection: 'column',}}>
            <Typography textAlign='center' component='h1'
            sx={{color: '#f9d13e',fontWeight: 600,fontSize: { xs: '2rem', md: '3rem' },mb: 2,letterSpacing: 1,}}>
                Перейдите в свою почту для её подтверждения. Следуйте инструкциям в сообщении
            </Typography>
        </Box>
    </Container>
    );
};

export default EmailVerificationPage;
