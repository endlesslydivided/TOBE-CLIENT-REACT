//@ts-nocheck
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Box,Typography } from '@mui/material';
import { toast } from 'react-toastify';
import {  useGetPagedPostsByUserQuery} from '../../../services/UsersApiSlice';
import { useAppSelector } from '../../../hooks/redux';
import NewsList, { FeedListItem } from '../../../components/newsList/NewsList';
import LineLoader from '../../../components/LineLoader';

interface IUsersPostListProps
{
  filters: object;
  setFilters: Function;
  userState:any
}

const UsersPostList:FC<IUsersPostListProps>= ({filters,setFilters,userState,...other}) => {
  
    const [posts,setPosts] = useState({rows:[],count:0});
    const [totalPages, setTotalPages] = useState(0);

    const lastElement = useRef()

    const 
    { 
      data, error:errorPosts,
      isSuccess:isSuccessPosts, 
      isLoading:isLoadingPosts,
      isFetching:isFetchingPosts
    }  = useGetPagedPostsByUserQuery({id:userState.id,filters:filters},{refetchOnMountOrArgChange:true,});

    const lastPostRef = useCallback(post =>
      {
        if(isLoadingPosts) return;

        if(lastElement.current) lastElement.current.disconnect();

        lastElement.current = new IntersectionObserver(posts=>
          {
            if(posts[0].isIntersecting &&  filters.page <= totalPages)
            {
              setFilters({...filters, page: filters.page + 1} );
            }
          })

        if (post) lastElement.current.observe(post);
      },[isLoadingPosts,totalPages])



    useEffect(() => 
    {
      if(isSuccessPosts && data)
      {
        setPosts({rows:[...posts.rows,...data.rows],count:data.count});
        setTotalPages(Math.ceil(data.count /  filters.limit));
      }
      
    },[isFetchingPosts])

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

    useEffect(() => checkQuery(errorPosts),[isLoadingPosts]);

    const notFound = (<Box sx={{ textAlign:"center",p:5}}>
                        <Typography sx={{ display: 'inline'}} component="span" variant="body1" color="text.secondary">
                            Новостей нет :(
                        </Typography>         
                      </Box> )


    return(   
      <Box > 
        {
          posts?.rows && posts?.count !== 0  ? 
          <><NewsList listItem={FeedListItem} newsList={posts?.rows}/>
          </> : isFetchingPosts ? <LineLoader/> : notFound        
        } 
        <div ref={lastPostRef} style={{height: 0}}/>
        {posts?.rows && posts?.count !== 0 && isFetchingPosts &&<LineLoader/> }
        
        
      </Box>   
    );
}



export default UsersPostList;