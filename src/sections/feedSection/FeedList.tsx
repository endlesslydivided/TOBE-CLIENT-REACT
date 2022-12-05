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
import ScrollTop from '../../components/ui/ScrollToTop';

interface IFeedListProps
{
    fetchingResult: any;
    lastPostRef: any;
    feed: Array<any>;
}



const FeedList:FC<IFeedListProps>= ({fetchingResult,feed,lastPostRef,...other}) => {
  

    const notFound = (<Box sx={{ textAlign:"center",p:5}}>
                        <Typography sx={{ display: 'inline'}} component="span" variant="body1" color="text.secondary">
                            Новостей нет :(
                        </Typography>         
                      </Box> )


    return(   
      <> 
        {
          feed?.rows &&  feed?.count !== 0  ? 
          <><NewsList listItem={FeedListItem} newsList={ feed?.rows}/>
          </> : fetchingResult?.isFetching ? <LineLoader/> : notFound        
        } 
        <div ref={lastPostRef} style={{height: 0}}/>
        { feed?.rows &&  feed?.count !== 0 &&  fetchingResult?.isFetching &&<LineLoader/> }
        
        
      </>   
    );
}



export default FeedList;