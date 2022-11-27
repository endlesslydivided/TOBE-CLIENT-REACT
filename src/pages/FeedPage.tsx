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
import PostsList from '../sections/feedSection/PostsList';
import PostForm from '../sections/feedSection/PostForm';

const initialFilters= {
    search: '',
    page: 1,
    limit: 10,
    orderBy:'createdAt',
    orderDirection: 'DESC',
    havePhoto: false
}

const FeedPage = () => 
{
    const userState :any = useAppSelector(state => state.auth.user);
    const [isDropActive,setIsDropActive] = useState(false);
    const [filters,setFilters] = useState(initialFilters)

    useEffect(() => {},[filters])


    return (
        <Container maxWidth="xl" 
        
        onDragOver={(e) => setIsDropActive(true)}
        onDragLeave={(e)=> setIsDropActive(false)}
        onDrop={(e)=> setIsDropActive(false)}>
            <Grid  container spacing={3} sx={{justifyContent:"center"}}>
                <Grid  xs={7}>
                    <PostForm isDropActive={isDropActive}/>  
                </Grid>
                
                <Grid  xs={7} sx={{py:0}}>
                    <PostsList filters={filters}/>  
                </Grid>
                
            </Grid>
        </Container>
    );
};

export default FeedPage;

