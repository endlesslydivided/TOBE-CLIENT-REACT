import {AppBar,Avatar,Box,Container,IconButton,Toolbar,Tooltip,Typography,} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { useLogoutMutation } from '../services/AuthApiSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { LoadingButton as _LoadingButton } from '@mui/lab';
  
const LoadingButton = styled(_LoadingButton)`
padding: 0.4rem;
background-color: #f9d13e;
color: #2363eb; 
font-weight: 500;

&:hover {
    background-color: #ebc22c;
    transform: translateY(-2px);
}
`;

const Header = () => 
{
    const navigate = useNavigate();
    const userState :any = useAppSelector(state => state.auth.user);

    const [logOut, { isLoading }] = useLogoutMutation();


    const onLogoutHandler = async () => {
        try
        {
            await logOut(null);
            navigate('/login');
        }
        catch(error)
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
    };

    return (
        <AppBar position='static'>
        <Container maxWidth='lg'>
            <Toolbar>
            <Typography
                variant='h6'
                onClick={() => navigate('/')}
                sx={{ cursor: 'pointer' }}
            >
                CodevoWeb
            </Typography>
            <Box display='flex' sx={{ ml: 'auto' }}>
                {!userState && (
                <>
                    <LoadingButton
                    sx={{ mr: 2 }}
                    onClick={() => navigate('/register')}
                    >
                    SignUp
                    </LoadingButton>
                    <LoadingButton onClick={() => navigate('/login')}>
                    Login
                    </LoadingButton>
                </>
                )}
                {userState && (
                <LoadingButton
                    sx={{ backgroundColor: '#eee' }}
                    onClick={onLogoutHandler}
                    loading={isLoading}
                >
                    Logout
                </LoadingButton>
                )}
                {userState && userState?.user?.role === 'admin' && (
                <LoadingButton
                    sx={{ backgroundColor: '#eee', ml: 2 }}
                    onClick={() => navigate('/admin')}
                >
                    Admin
                </LoadingButton>
                )}
                <Box sx={{ ml: 4 }}>
                <Tooltip
                    title='Post settings'
                    onClick={() => navigate('/profile')}
                >
                    <IconButton sx={{ p: 0 }}>
                    <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                    </IconButton>
                </Tooltip>
                </Box>
            </Box>
            </Toolbar>
        </Container>
        </AppBar>
    );
};

export default Header;
  
  