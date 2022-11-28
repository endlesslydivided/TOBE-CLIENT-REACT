import { minHeight } from '@mui/system';
import { useAppSelector } from '../hooks/redux';
import { Add, KeyboardArrowUp } from '@mui/icons-material';
import { Box, Button, Container, Fab, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import ProfileMainPhoto from '../sections/profile/userMainPhoto/ProfileMainPhoto';
import UserData from '../sections/profile/userData/UserData';
import DragZone from '../components/dragZone';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserQuery } from '../services/UsersApiSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import FullScreenLoader from '../components/FullScreenLoader';
import UserMainPhoto from '../sections/profile/userMainPhoto/UserMainPhoto';
import ScrollTop from '../components/ui/ScrollToTop';
import UsersPostList from '../sections/profile/userNews/UsersPostList';

const initialFilters= {
  search: '',
  page: 1,
  limit: 10,
  orderBy:'createdAt',
  orderDirection: 'DESC',
}



const UserPage = () => 
{
    const {id} = useParams()
    const [isDropActive,setIsDropActive] = useState(false);
    const { data:user, error, isLoading }  = useGetUserQuery({id: id && parseInt(id)});
    const [filters,setFilters] = useState(initialFilters)
    useEffect(() => {},[filters])


    const checkQuery = (status:any) => 
      {
          if (error) 
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

    useEffect(() => checkQuery(error),[isLoading]);
    
    if(!user)
    {
        return <FullScreenLoader/>
    }

    return (
        <Container maxWidth="xl" onDragOver={(e) => setIsDropActive(true)}  onDragLeave={(e)=> setIsDropActive(false)}>
            <Grid container spacing={3}>
                <Grid id="back-to-top-anchor" item xs={12} md={3} lg={3}>
                    <UserMainPhoto sx={{height:"100%",alignItems:"center"}} userState={user}/>
                </Grid>
                <Grid item xs={12} md lg>
                    <UserData sx={{alignItems:"center",height:"100%"}}  userState={user}/>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <UsersPostList userState={user} filters={filters} setFilters={setFilters}/>
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

export default UserPage;

