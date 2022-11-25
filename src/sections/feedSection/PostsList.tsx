
import { styled } from  '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, FormControlLabel, FormGroup, List, ListItemText, Switch, Tab, Tabs } from '@mui/material';
import { FC, ReactNode, useEffect, useState } from 'react';
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

interface IPostsListProps
{
    filters: object
}


const PostsList:FC<IPostsListProps>= ({filters,...other}) => {
  
    const [limit,setLimit] = useState(10);
    const [page,setPage] = useState(1);

    const userState :any = useAppSelector(state => state.auth.user);

    const { data:feed, error:errorFeed, isLoading:isLoadingFeed}  = useGetPagedFeedByUserQuery({id:userState.id,filters},{refetchOnMountOrArgChange:true});

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
        isLoadingFeed ? <FullScreenLoader/> :
        feed?.rows && feed?.count !== 0  ? <NewsList listItem={FeedListItem} newsList={feed?.rows}/> : 
        notFound     
    );
}



export default PostsList;