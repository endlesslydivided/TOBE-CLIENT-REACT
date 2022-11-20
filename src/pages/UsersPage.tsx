import { minHeight } from '@mui/system';
import { useAppSelector } from '../hooks/redux';
import { Add } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import UserMainPhoto from '../sections/profile/userMainPhoto/UserMainPhoto';
import UserData from '../sections/profile/userData/UserData';
import DragZone from '../components/dragZone';
import { useRef, useState } from 'react';
import UsersList from '../sections/usersList/UsersList';


const UsersPage = () => 
{
    const userState :any = useAppSelector(state => state.auth.user);
    const [isDropActive,setIsDropActive] = useState(false);

    return (
        <Container maxWidth="xl" onDragOver={(e) => setIsDropActive(true)}  onDragLeave={(e)=> setIsDropActive(false)}>
            <Grid container spacing={3}>
                <Grid item xs={8} md={8} lg={8}>
                    <UsersList />
                </Grid>
            </Grid>
        </Container>
    );
};

export default UsersPage;

