import { minHeight } from '@mui/system';
import { useAppSelector } from '../hooks/redux';
import { Add, KeyboardArrowUp } from '@mui/icons-material';
import { Box, Button, Container, Fab, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import ProfileMainPhoto from '../sections/profile/userMainPhoto/ProfileMainPhoto';
import UserData from '../sections/profile/userData/UserData';
import DragZone from '../components/dragZone';
import { useEffect, useRef, useState } from 'react';
import UserMainPhoto from '../sections/profile/userMainPhoto/UserMainPhoto';
import UsersPostList from '../sections/profile/userNews/UsersPostList';
import PostForm from '../sections/feedSection/PostForm';
import ScrollTop from '../components/ui/ScrollToTop';

const initialFilters= {
    search: '',
    page: 1,
    limit: 10,
    orderBy:'createdAt',
    orderDirection: 'DESC',
}

const ProfilePage = () => 
{
    const userState :any = useAppSelector(state => state.auth.user);
    const [isDropActive,setIsDropActive] = useState(false);
    const [filters,setFilters] = useState(initialFilters)
    useEffect(() => {},[filters])

    return (
        <Container maxWidth="xl" onDragOver={(e) => setIsDropActive(true)}  onDragLeave={(e)=> setIsDropActive(false)}>
            <Grid   container rowSpacing={2} spacing={3}>
                <Grid  id="back-to-top-anchor" item xs={12} md={3} lg={3}>
                    <ProfileMainPhoto sx={{height:"100%",alignItems:"center"}} isDropActive={isDropActive} userState={userState}/>
                </Grid>
                <Grid item xs={12} md lg>
                    <UserData sx={{alignItems:"center",height:"100%"}}  userState={userState}/>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <PostForm isDropActive={isDropActive}/>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <UsersPostList userState={userState} filters={filters} setFilters={setFilters}/>
                </Grid>
            </Grid>
            <ScrollTop >
                <Fab size="large" color="info" aria-label="scroll back to top">
                    <KeyboardArrowUp />
                </Fab>
            </ScrollTop>
        </Container>
    );
};

export default ProfilePage;

