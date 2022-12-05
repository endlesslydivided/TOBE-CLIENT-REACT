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
  lastPostRef: any;
  fetchResult: any;
  posts:Array<any>
}

const UsersPostList:FC<IUsersPostListProps>= ({lastPostRef,posts,fetchResult,...other}) => {
  
    const notFound = (<Box sx={{ textAlign:"center",p:5}}>
                        <Typography sx={{ display: 'inline'}} component="span" variant="body1" color="text.secondary">
                            Новостей нет :(
                        </Typography>         
                      </Box> )


    return(   
      <Box> 
        {
          posts?.rows && posts?.count !== 0  ? 
          <NewsList listItem={FeedListItem} newsList={posts?.rows}/> : 
          fetchResult?.isFetching ? <LineLoader/> : notFound        
        } 

        <div ref={lastPostRef} style={{height: 0}}/>

        {posts?.rows && posts?.count !== 0 && fetchResult?.isFetching  &&<LineLoader/> }
        
        
      </Box>   
    );
}



export default UsersPostList;