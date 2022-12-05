//@ts-nocheck
import { KeyboardArrowUp } from '@mui/icons-material';
import { Container, Fab, Grid} from '@mui/material';
import UserData from '../sections/profile/userData/UserData';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPagedPostsByUserQuery, useGetUserQuery } from '../services/UsersApiSlice';
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

const UserPage = () => 
{
    const {id} = useParams()
    const [isDropActive,setIsDropActive] = useState(false);
    const [filters,setFilters] = useState(initialFilters)
    const [posts,setPosts] = useState({rows:[],count:0});
    const [totalPages, setTotalPages] = useState(0);

    const userResult  = useGetUserQuery({id: id && parseInt(id)});
    const postsResult= useGetPagedPostsByUserQuery({id:id,filters:filters},{refetchOnMountOrArgChange:true,});

    //useEffect(() => {},[filters])

    const lastElement = useRef()
    const lastPostRef = useCallback((post:any) =>
      {
        if(postsResult.isLoading) return;

        if(lastElement.current) lastElement.current.disconnect();

        lastElement.current = new IntersectionObserver(posts=>
        {
          if(posts[0].isIntersecting &&  filters.page <= totalPages)
          {
              setFilters({...filters, page: filters.page + 1} );
          }
        })

        if (post) lastElement.current.observe(post);
      },[postsResult.isLoading,totalPages]
    )

    useEffect(() => 
    {
        if(postsResult.isSuccess && postsResult.data)
        {
            setPosts({rows:[...posts.rows,...postsResult.data.rows],count:postsResult.data.count});
            setTotalPages(Math.ceil(postsResult.data.count /  filters.limit));
        }      
    },[postsResult.isFetching])

    useEffect(() => checkQuery(postsResult.error),[postsResult.isLoading]);


    useEffect(() => checkQuery(userResult.error),[userResult.isLoading]);
    
    if(!userResult.data)
    {
        return <FullScreenLoader/>
    }

    return (
        <Container maxWidth="xl" onDragOver={(e) => setIsDropActive(true)}  onDragLeave={(e)=> setIsDropActive(false)}>
            <Grid container spacing={3}>
                <Grid id="back-to-top-anchor" item xs={12} md={3} lg={3}>
                    <UserMainPhoto sx={{height:"100%",alignItems:"center"}} userState={userResult.data}/>
                </Grid>
                <Grid item xs={12} md lg>
                    <UserData sx={{alignItems:"center",height:"100%"}}  userState={userResult.data}/>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <UsersPostList posts={posts} fetchResult={postsResult} lastPostRef={lastPostRef}/>
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

