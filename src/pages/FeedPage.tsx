//@ts-nocheck
import { minHeight } from '@mui/system';
import { useAppSelector } from '../hooks/redux';
import { Add, KeyboardArrowUp} from '@mui/icons-material';
import { Box, Button, Card, Container, Fab, FormGroup, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import UserMainPhoto from '../sections/profile/userMainPhoto/UserMainPhoto';
import UserData from '../sections/profile/userData/UserData';
import DragZone from '../components/dragZone';
import { useCallback, useEffect, useRef, useState } from 'react';
import UsersList from '../sections/usersList/UsersList';
import UsersFilter from '../sections/usersList/UsersFilters';
import { Search, SearchIconWrapper, StyledInputBase } from '../components/search/Search';
import SearchIcon from '@mui/icons-material/Search';
import PostForm from '../sections/feedSection/PostForm';
import ScrollTop from '../components/ui/ScrollToTop';
import FeedList from '../sections/feedSection/FeedList';
import { useGetPagedFeedByUserQuery } from '../services/UsersApiSlice';

const initialFilters= {
    search: '',
    page: 1,
    limit: 10,
    orderBy:'createdAt',
    orderDirection: 'DESC',
    havePhoto: false
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

const FeedPage = () => 
{
    const userState :any = useAppSelector(state => state.auth.user);
    
    const [isDropActive,setIsDropActive] = useState(false);
    const [filters,setFilters] = useState({
      search: '',
      page: 1,
      limit: 10,
      orderBy:'createdAt',
      orderDirection: 'DESC',
      havePhoto: false
  }
  );
    const [feed,setFeed] = useState({rows:[],count:0});
    const [totalPages, setTotalPages] = useState(0);

    const result  = useGetPagedFeedByUserQuery({id:userState.id,filters},{refetchOnMountOrArgChange:true,});

    useEffect(() => checkQuery(result.error),[result.isLoading]);
    useEffect(() => 
    {
      if(result.isSuccess && result.data)
      {
        setFeed({rows:[...feed.rows,...result.data.rows],count:result.data.count});
        setTotalPages(Math.ceil(result.data.count /  filters.limit));
      }
    },[result.isFetching])

    const lastElement = useRef()

    const lastPostRef = useCallback(post =>
      {
        if(result.isLoading) return;

        if(lastElement.current) lastElement.current.disconnect();

        lastElement.current = new IntersectionObserver(posts=>
          {
            if(posts[0].isIntersecting &&  filters.page <= totalPages)
            {
              setFilters(previous => ({...previous, page: previous.page + 1}));
            }
          })

        if (post) lastElement.current.observe(post);
      },[result.isLoading,totalPages])
   


    return (
        <Container maxWidth="xl"       
        onDragOver={(e) => setIsDropActive(true)}
        onDragLeave={(e)=> setIsDropActive(false)}
        onDrop={(e)=> setIsDropActive(false)}>
            <Grid  container spacing={3} sx={{justifyContent:"center"}}>
                <Grid id="back-to-top-anchor"  xs={7}>
                    <PostForm setPosts={setFeed} posts={feed} isDropActive={isDropActive}/>  
                </Grid>
                
                <Grid  xs={7} sx={{py:0}}>
                    <FeedList lastPostRef={lastPostRef} feed={feed} fetchingResult={result} />  
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

