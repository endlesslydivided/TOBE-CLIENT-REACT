//@ts-nocheck
import { ArrowLeft, Feed, People, PeopleOutline } from '@mui/icons-material';
import { Box, Button, CardContent, Container, Fab, Grid, IconButton } from '@mui/material';
import WidgetSummary from '../../components/summaryWidget/SummaryWidget';
import SummarySection from '../../sections/AdminSections/summary/SummarySection';
import { Card, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import NavigateBackButton from '../../components/ui/NavigateBackButton';
import { useGetPagedUsersQuery } from '../../services/UsersApiSlice';
import { toast } from 'react-toastify';
import AdminUsersTable from '../../components/adminUsersTable/AdminUsersTable';

const initialFilters=
{
    search: '',
    page: 1,
    limit: 10,
    orderBy:'createdAt',
    orderDirection: 'DESC',
}

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

const UsersAdminPage = () => 
{

  const [filters,setFilters] = useState(initialFilters)

  const resultGetUsers  = useGetPagedUsersQuery(filters,{refetchOnMountOrArgChange:true});

  
  useEffect(() => checkQuery(resultGetUsers.error),[resultGetUsers.isLoading]);
 
  return (
    <Container maxWidth="xl" sx={{height:'100%'}}>
      <NavigateBackButton/>

      <Grid container spacing={3} sx={{height:'100%'}}>
          
          <Grid item xs={12} md={9} lg={9}>
            <SummarySection/>

          </Grid>
      </Grid>
    </Container>
  );
};

export default UsersAdminPage;

