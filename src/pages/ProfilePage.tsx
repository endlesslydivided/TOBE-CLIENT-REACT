import { minHeight } from '@mui/system';
import { useAppSelector } from '../hooks/redux';
import { Add } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import UserMainPhoto from '../sections/profile/UserMainPhoto';
import UserData from '../sections/profile/userData/UserData';
import DragZone from '../components/dragZone';
import { useRef, useState } from 'react';


const ProfilePage = () => 
{
    const userState :any = useAppSelector(state => state.auth.user);
    const [isDropActive,setIsDropActive] = useState(false);



    return (
        <Container maxWidth="xl" onDragOver={(e) => setIsDropActive(true)}  onDragLeave={(e)=> setIsDropActive(false)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3} lg={3}>
                    <UserMainPhoto sx={{height:"75%",alignItems:"center"}} isDropActive={isDropActive} userState={userState}/>
                </Grid>
                <Grid item xs={12} md lg>
                    <UserData sx={{alignItems:"center"}}  userState={userState}/>
                </Grid>
            </Grid>
        </Container>
            // <Grid container spacing={3} sx={{height:"100%",width:"100%",margin:0,padding:0, '& .MuiGrid-item': {padding:0}}}>
            //     <Grid item sx={{padding: 0,'& .MuiGrid-item': { padding:0},}} xs={3}>
                  
            //     </Grid>
            //     <Grid item xs={9}>
            //         <Box sx={{ mt: 2 }}>
            //             <Typography gutterBottom>
            //                 <strong>Id:</strong> {userState?._id}
            //             </Typography>
            //             <Typography gutterBottom>
            //                 <strong>Full Name:</strong> {userState?.firstName + ' ' + userState?.lastName}
            //             </Typography>
            //             <Typography gutterBottom>
            //                 <strong>Email Address:</strong> {userState?.email}
            //             </Typography>
            //             {/* <Typography gutterBottom>
            //                 <strong>Role:</strong> {user?.role}
            //             </Typography> */}
            //         </Box>
            //     </Grid>
                
            // </Grid>
    );
};

export default ProfilePage;

