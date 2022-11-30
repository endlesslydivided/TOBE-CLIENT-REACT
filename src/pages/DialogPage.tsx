//@ts-nocheck
import { styled } from  '@mui/material/styles';
import { Card, CardActions, CardContent, CardHeader, Divider, FormControlLabel, FormGroup, List, ListItemText, Switch, Tab, Tabs } from '@mui/material';
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Add, DateRange, Language, LocationCity, Wc } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import { DateTimePicker } from '@mui/lab';
import AvatarList from '../components/avatarList';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useGetPagedAvoidedRequestsByUserQuery, useGetPagedDialogsByUserQuery, useGetPagedFriendsByUserQuery, useGetPagedFriendsRequestsByUserQuery, useGetPagedUsersQuery } from '../services/UsersApiSlice';
import FullScreenLoader from '../components/FullScreenLoader';
import { useAppSelector } from '../hooks/redux';
import { Search, SearchIconWrapper, StyledInputBase } from '../components/search/Search';
import SearchIcon from '@mui/icons-material/Search';
import { ObjectPair } from 'zod';
import LineLoader from '../components/LineLoader';
import { useGetMessagesQuery } from '../services/ChatApiSlice';
import MessagesList from '../components/messagesList';
import { MessageListItem } from '../components/messagesList/MessagesList';
import { useParams } from 'react-router-dom';
import DialogForm from '../sections/chat/DialogForm';

interface IDialogSectionProps
{

}

const initialFilters=
{
    search: '',
    page: 1,
    limit: 10,
    orderBy:'createdAt',
    orderDirection: 'DESC',
}



const DialogPage:FC<IDialogSectionProps>= ({...other}) => {
  
    const userState :any = useAppSelector(state => state.auth.user);
    const {id} = useParams();
    const [filters,setFilters] = useState(initialFilters)
    useEffect(() => {},[filters])

    const [messages,setMessages] = useState({rows:[],count:0});
    const [totalPages, setTotalPages] = useState(0);

    const lastElement = useRef()
    const { data, error:errorMessages,isSuccess:isSuccessMessages, isLoading:isLoadingMessages,isFetching:isFethingMessages}  
    = useGetMessagesQuery({dialogId:id,toUserId:userState.id,filters:filters});

    const lastMessageRef = useCallback(message =>
      {
        if(isLoadingMessages) return;

        if(lastElement.current) lastElement.current.disconnect();

        lastElement.current = new IntersectionObserver(messages=>
          {
            if(messages[0].isIntersecting &&  filters.page <= totalPages)
            {
              setFilters({...filters, page: filters.page + 1} );
            }
          })

        if (message) lastElement.current.observe(message);
      },[isLoadingMessages,totalPages])

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

    useEffect(() => checkQuery(errorMessages),[isLoadingMessages]);


    const notFound = (<Box sx={{ textAlign:"center",p:5}}>
                          <Typography sx={{ display: 'inline'}} component="span" variant="body1" color="text.secondary">
                              Напишите первыми)
                          </Typography>         
                      </Box> )


    return(
      <Card {...other}>                     
          <CardContent  sx={{ p: 1,pb:0 }}>
          {
            messages?.rows && messages?.count !== 0  ? 
            <MessagesList listItem={MessageListItem} membersList={messages?.rows}/>
            : isFethingMessages ? <LineLoader/> : notFound        
          } 
            <div ref={lastMessageRef} style={{height: 0}}/>
          {
            messages?.rows && messages?.count !== 0 && isFethingMessages &&<LineLoader/> 
          }                      
          </CardContent>   
          <CardActions>
            <DialogForm/>
          </CardActions>       
      </Card>
  );
}

export default DialogPage;