//@ts-nocheck
import { styled } from  '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, FormControlLabel, FormGroup, List, ListItemText, Switch, Tab, Tabs } from '@mui/material';
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Add, DateRange, Language, LocationCity, Wc } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import { DateTimePicker } from '@mui/lab';
import AvatarList from '../../components/avatarList';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useGetPagedAvoidedRequestsByUserQuery, useGetPagedFeedByUserQuery, useGetPagedFriendsByUserQuery, useGetPagedFriendsRequestsByUserQuery, useGetPagedPostsByUserQuery, useGetPagedUsersQuery } from '../../services/UsersApiSlice';
import FullScreenLoader from '../../components/FullScreenLoader';
import { FriendsListItem, RequestListItem, UsersListItem } from '../../components/avatarList/AvatarList';
import { useAppSelector } from '../../hooks/redux';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/search/Search';
import SearchIcon from '@mui/icons-material/Search';
import { ObjectPair } from 'zod';
import NewsList, { FeedListItem } from '../../components/newsList/NewsList';
import { useObserver } from '../../hooks/useObserver';
import LineLoader from '../../components/LineLoader';

interface IPostsListProps
{
    filters: object;
    setFilters: Function
}



const PostsList:FC<IPostsListProps>= ({filters,setFilters,...other}) => {
  
    const [feed,setFeed] = useState({rows:[],count:0});
    const [totalPages, setTotalPages] = useState(0);

    const lastElement = useRef()

    const userState :any = useAppSelector(state => state.auth.user);

    const { data, error:errorFeed,isSuccess:isSuccessFeed, isLoading:isLoadingFeed,isFetching:isFethingFeed}  = useGetPagedFeedByUserQuery({id:userState.id,filters:filters},{refetchOnMountOrArgChange:true,});

    const lastPostRef = useCallback(post =>
      {
        if(isLoadingFeed) return;

        if(lastElement.current) lastElement.current.disconnect();

        lastElement.current = new IntersectionObserver(posts=>
          {
            if(posts[0].isIntersecting &&  filters.page <= totalPages)
            {
              setFilters({...filters, page: filters.page + 1} );
            }
          })

        if (post) lastElement.current.observe(post);
      },[isLoadingFeed,totalPages])



    useEffect(() => 
    {
      if(isSuccessFeed && data)
      {
        setFeed({rows:[...feed.rows,...data.rows],count:data.count});
        setTotalPages(Math.ceil(data.count /  filters.limit));
      }
      
    },[isFethingFeed])

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

    useEffect(() => checkQuery(errorFeed),[isLoadingFeed]);

    const notFound = (<Box sx={{ textAlign:"center",p:5}}>
                        <Typography sx={{ display: 'inline'}} component="span" variant="body1" color="text.secondary">
                            Новостей нет :(
                        </Typography>         
                      </Box> )


    return(   
      <> 
        {
          feed?.rows && feed?.count !== 0  ? 
          <><NewsList listItem={FeedListItem} newsList={feed?.rows}/>
          </> : isFethingFeed ? <LineLoader/> : notFound        
        } 
        <div ref={lastPostRef} style={{height: 0}}/>
        {feed?.rows && feed?.count !== 0 && isFethingFeed &&<LineLoader/> }
        
        
      </>   
    );
}



export default PostsList;