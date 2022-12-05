//@ts-nocheck
import { minHeight } from '@mui/system';
import { useAppSelector } from '../hooks/redux';
import { Add, KeyboardArrowUp } from '@mui/icons-material';
import { Box, Button, Container, Fab, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import ProfileMainPhoto from '../sections/profile/userMainPhoto/ProfileMainPhoto';
import UserData from '../sections/profile/userData/UserData';
import DragZone from '../components/dragZone';
import { useCallback, useEffect, useRef, useState } from 'react';
import UserMainPhoto from '../sections/profile/userMainPhoto/UserMainPhoto';
import UsersPostList from '../sections/profile/userNews/UsersPostList';
import PostForm from '../sections/feedSection/PostForm';
import ScrollTop from '../components/ui/ScrollToTop';
import { useGetPagedPostsByUserQuery } from '../services/UsersApiSlice';
import { toast } from 'react-toastify';

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

const ProfilePage = () => 
{
    const userState :any = useAppSelector(state => state.auth.user);

    const [isDropActive,setIsDropActive] = useState(false);
    const [filters,setFilters] = useState(initialFilters)
    const [posts,setPosts] = useState({rows:[],count:0});
    const [totalPages, setTotalPages] = useState(0);

    //useEffect(() => {},[filters])   
    const result = useGetPagedPostsByUserQuery({id:userState.id,filters:filters},{refetchOnMountOrArgChange:true,});
    const lastElement = useRef()


    const lastPostRef = useCallback(post =>
        {
            if(result.isLoading) return;

            if(lastElement.current) lastElement.current.disconnect();

            lastElement.current = new IntersectionObserver(posts=>
                {
                if(posts[0].isIntersecting &&  filters.page <= totalPages)
                {
                    setFilters(previous => ({...previous, page: previous.page + 1}) );
                }
                })

            if (post) lastElement.current.observe(post);
        },[result.isLoading,totalPages]
    )

    useEffect(() => 
    {
        if(result.isSuccess && result.data)
        {
            setPosts({rows:[...posts.rows,...result?.data?.rows],count:result?.data?.count});
            setTotalPages(Math.ceil(result?.data?.count /  filters.limit));
        }      
    },[result.isFetching])

    useEffect(() => checkQuery(result?.error),[result?.isLoading]);

    return (
        <Container maxWidth="xl" onDragOver={(e) => setIsDropActive(true)}  onDragLeave={(e)=> setIsDropActive(false)}>
            <Grid   container rowSpacing={2} spacing={3}>
                <Grid  id="back-to-top-anchor" item xs={12} md={3} lg={3}>
                    <ProfileMainPhoto sx={{height:"100%",alignItems:"center"}} isDropActive={isDropActive} userState={userState}/>
                </Grid>
                <Grid item xs={12} md lg>
                    <UserData sx={{alignItems:"center",height:"100%"}}  userState={userState}/>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <PostForm setPosts={setPosts} posts={result.data} isDropActive={isDropActive}/>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <UsersPostList 
                    posts={posts}
                    lastPostRef={lastPostRef} 
                    fetchingResult={result}/>
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

export default ProfilePage;

