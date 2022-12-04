import { minHeight } from '@mui/system';
import { useAppSelector } from '../hooks/redux';
import { Add } from '@mui/icons-material';
import { Box, Button, Card, Container, FormGroup, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import ProfileMainPhoto from '../sections/profile/userMainPhoto/UserMainPhoto';
import UserData from '../sections/profile/userData/UserData';
import DragZone from '../components/dragZone';
import { useEffect, useRef, useState } from 'react';
import { Search, SearchIconWrapper, StyledInputBase } from '../components/search/Search';
import SearchIcon from '@mui/icons-material/Search';
import DialogList from '../sections/dialogList/DialogList';
import { useParams } from 'react-router-dom';

const initialFilters=
{
    search: '',
    page: 1,
    limit: 10,
    orderBy:'createdAt',
    orderDirection: 'DESC',
}

const ChatPage = () => 
{
    const userState :any = useAppSelector(state => state.auth.user);
    const [isDropActive,setIsDropActive] = useState(false);
    const [filters,setFilters] = useState(initialFilters)

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
                                    onChange={(e) => setFilters({...filters,search:e.target.value})}
                                    sx={{width:'100%'}}
                                    placeholder="Поиск..."
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </FormGroup>
                    </Card>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <DialogList filters={filters} setFilters={setFilters}/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ChatPage;



 


   