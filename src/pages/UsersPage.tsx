import { minHeight } from '@mui/system';
import { useAppSelector } from '../hooks/redux';
import { Add} from '@mui/icons-material';
import { Box, Button, Card, Container, FormGroup, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import UserMainPhoto from '../sections/profile/userMainPhoto/UserMainPhoto';
import UserData from '../sections/profile/userData/UserData';
import DragZone from '../components/dragZone';
import { useEffect, useRef, useState } from 'react';
import UsersList from '../sections/usersList/UsersList';
import UsersFilter from '../sections/usersList/UsersFilters';
import { Search, SearchIconWrapper, StyledInputBase } from '../components/search/Search';
import SearchIcon from '@mui/icons-material/Search';

const initialFilters= {
    sex: '',
    search: '',
    country: '',
    city:'',
    page: 1,
    limit: 10,
    orderBy:'createdAt',
    orderDirection: 'DESC',
    havePhoto: false
}

const UsersPage = () => 
{
    const userState :any = useAppSelector(state => state.auth.user);
    const [isDropActive,setIsDropActive] = useState(false);
    const [filters,setFilters] = useState(initialFilters)

    useEffect(() => {},[filters])


    return (
        <Container maxWidth="xl" onDragOver={(e) => setIsDropActive(true)}  onDragLeave={(e)=> setIsDropActive(false)}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card>
                        <FormGroup sx={{p:1.5}}>
                            <Search >
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    value={filters.search}
                                    onChange={(e) => setFilters(previous => ({...previous,search:e.target.value}))}
                                    sx={{width:'100%'}}
                                    placeholder="Поиск..."
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </FormGroup>
                    </Card>
                    
                </Grid>
                <Grid item xs={8} md={8} lg={8}>
                    <UsersList filters={filters}/>
                </Grid>
                <Grid item xs={4} md={4} lg={4}>
                    <UsersFilter setFilters={setFilters} initial={initialFilters} filters={filters} />
                </Grid>
                
            </Grid>
        </Container>
    );
};

export default UsersPage;

