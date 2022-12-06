import { Feed, People, PeopleOutline } from '@mui/icons-material';
import { Box, Button, CardContent, Container, Grid, IconButton } from '@mui/material';
import WidgetSummary from '../../components/summaryWidget/SummaryWidget';
import SummarySection from '../../sections/AdminSections/summary/SummarySection';
import { Card, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Navigate, useNavigate } from 'react-router-dom';
import { ADMIN_POSTS_ROUTE, ADMIN_USERS_ROUTE } from '../../utils/consts';
import { useGetPagedUsersQuery } from '../../services/UsersApiSlice';
import { useEffect } from 'react';
import FullScreenLoader from '../../components/FullScreenLoader';
import { toast } from 'react-toastify';

const checkQuery = (error:any) => 
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

const MainAdminPage = () => {

  const navigate = useNavigate();
  

  return (
    <Container maxWidth="xl" sx={{height:'100%'}}>
      <Grid container spacing={3} sx={{height:'100%'}}>
          <Grid id="back-to-top-anchor" item xs={12} md={3} lg={3}>
            <Stack direction="column" sx={{height:'100%'}}>
              <Button variant="outlined" sx={{bgcolor:'grey.400',mb:3,height:'100%'}} 
              onClick={() => navigate(`/admin${ADMIN_USERS_ROUTE}`)} startIcon={<People/>}>
                Пользователи
              </Button>
              <Button variant="outlined" sx={{bgcolor:'grey.400',mb:3,height:'100%'}}
              onClick={() => navigate(`/admin${ADMIN_POSTS_ROUTE}`)} startIcon={<Feed/>}>
                Посты
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <SummarySection/>

          </Grid>
      </Grid>
    </Container>
  );
};

export default MainAdminPage;

