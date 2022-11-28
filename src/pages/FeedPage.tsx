import { minHeight } from '@mui/system';
import { useAppSelector } from '../hooks/redux';
import { Add, KeyboardArrowUp} from '@mui/icons-material';
import { Box, Button, Card, Container, Fab, FormGroup, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import UserMainPhoto from '../sections/profile/userMainPhoto/UserMainPhoto';
import UserData from '../sections/profile/userData/UserData';
import DragZone from '../components/dragZone';
import { useEffect, useRef, useState } from 'react';
import UsersList from '../sections/usersList/UsersList';
import UsersFilter from '../sections/usersList/UsersFilters';
import { Search, SearchIconWrapper, StyledInputBase } from '../components/search/Search';
import SearchIcon from '@mui/icons-material/Search';
import PostForm from '../sections/feedSection/PostForm';
import ScrollTop from '../components/ui/ScrollToTop';
import FeedList from '../sections/feedSection/FeedList';

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
                <Grid id="back-to-top-anchor"  xs={7}>
                    <PostForm  isDropActive={isDropActive}/>  
                </Grid>
                
                <Grid  xs={7} sx={{py:0}}>
                    <FeedList filters={filters} setFilters={setFilters}/>  
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

export default FeedPage;

