import { Feed, People, PeopleOutline } from '@mui/icons-material';
import { Box, Button, CardContent, Container, FormGroup, Grid, IconButton } from '@mui/material';
import WidgetSummary from '../../components/summaryWidget/SummaryWidget';
import SummarySection from '../../sections/AdminSections/summary/SummarySection';
import { Card, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { Navigate, useNavigate } from 'react-router-dom';
import { ADMIN_POSTS_ROUTE, ADMIN_USERS_ROUTE } from '../../utils/consts';
import { useGetPagedUsersQuery } from '../../services/UsersApiSlice';
import { useEffect, useState } from 'react';
import FullScreenLoader from '../../components/FullScreenLoader';
import { toast } from 'react-toastify';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/search/Search';
import SearchIcon from '@mui/icons-material/Search';
import DialogList from '../../sections/dialogList/DialogList';
import AdminDialogList from '../../sections/dialogList/AdminDialogList';
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

const initialFilters=
{
    search: '',
    page: 1,
    limit: 10,
    orderBy:'createdAt',
    orderDirection: 'ASC',
}

const MainAdminPage = () => {

  const navigate = useNavigate();
  const [filters,setFilters] = useState(initialFilters)

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
            <Stack direction="column"  sx={{height:'100%'}}>
              <SummarySection />
              <Grid container  sx={{mt:0.1,maxHeight:'100px'}} spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <FormGroup sx={{p:1.5}}>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    value={filters.search}
                                    onChange={(e) => setFilters((previous:any) => ({...previous,search:e.target.value}))}
                                    sx={{width:'100%'}}
                                    placeholder="Поиск..."
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </FormGroup>
                    </Card>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <AdminDialogList filters={filters} setFilters={setFilters}/>
                </Grid>
              </Grid>
            </Stack>
          
          </Grid>

      </Grid>
    </Container>
  );
};

export default MainAdminPage;

