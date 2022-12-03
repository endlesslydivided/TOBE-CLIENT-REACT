//@ts-nocheck
import { styled } from  '@mui/material/styles';
import { AppBar, Card, CardActions, CardContent, CardHeader, Divider, FormControlLabel, FormGroup, IconButton, List, ListItemText, Switch, Tab, Tabs, Toolbar } from '@mui/material';
import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Add, ArrowLeft, DateRange, Language, LocationCity, Wc } from '@mui/icons-material';
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
import { useGetDialogsQuery, useGetMessagesQuery, useLazyGetMessagesQuery } from '../services/ChatApiSlice';
import MessagesList from '../components/messagesList';
import { MessageListItem } from '../components/messagesList/MessagesList';
import { useNavigate, useParams } from 'react-router-dom';
import DialogForm from '../sections/chat/DialogForm';
import { StyledRoot } from '../layouts/dashboard/header';
import { useGetOneDialogQuery } from '../services/DialogsApiSlice';
import { Avatar } from '@material-ui/core';
import { Stack } from '@mui/system';

interface IDialogSectionProps
{

}

const initialFilters=
{
    search: '',
    lastDate: Date.MA,
    limit: 10,
    fixedLimit: 10,
    orderBy:'createdAt',
    orderDirection: 'DESC',
}

const DialogPage:FC<IDialogSectionProps>= ({...other}) => {
  
    const userState :any = useAppSelector(state => state.auth.user);

    const {id} = useParams();
    const [filters,setFilters] = useState(initialFilters)
    const [messages,setMessages] = useState({rows:[],count:1});
    const [countLeft, setCountLeft] = useState(0);
    const [dialogUser,setDialogUser] = useState(null);

    const lastElement = useRef()
    const bottom = useRef()

    const [ trigger,{data, currentData,
      error:errorMessages,
      isSuccess:isSuccessMessages, 
      isLoading:isLoadingMessages,
      isFetching:isFethingMessages}
      ] = useLazyGetMessagesQuery();

    const { data:dialog, error:errorDialog,isSuccess:isSuccessDialog, isLoading:isLoadingDialog}  
    = useGetOneDialogQuery({id: id && parseInt(id)});

      useEffect(()=>
      {
        trigger({dialogId:id,toUserId:userState.id,filters:filters,auth:{dialogId:id, id: userState.id}},true);
      },[])


    const navigate = useNavigate();

    const lastMessageRef = useCallback(message =>
      {
        if(isFethingMessages) return;

        if(lastElement.current) lastElement.current.disconnect();

        lastElement.current = new IntersectionObserver(messages=>
          {
            if(messages[0].isIntersecting &&  countLeft !== 0)
            {
              trigger({dialogId:id,toUserId:userState.id,filters:filters,auth:{dialogId:id, id: userState.id}},false)
            }
          })

        if (message) lastElement.current.observe(message);
      },[isFethingMessages,countLeft])

    useEffect(() => 
    {
      if(data?.havingResults)
      {
        const reversed =[...data.rows].reverse();
        setMessages({rows:[...reversed,...messages.rows],count:1});
        setFilters({...filters,lastDate:reversed[0]?.createdAt});
        setCountLeft(data.count);

        // const messagesData = data[data.length - 1];
        // const allMessages = data.map((x) => x.rows? x.rows : {...x.message,user:x.user}).flat();
        // const lastCount = data.filter((x) => x.count)[0]?.count;
        // if(data[data.length - 1].rows)
        // {
        //   const reversed = [...messagesData.rows].reverse();
        //   if(messagesData.count !== 0)
        //   {
        //     setMessages({rows:[...reversed,...messages.rows],count:messagesData.count});
        //     setFilters({...filters,lastDate:reversed[0].createdAt});
        //   }
        //   setCountLeft(messagesData.count);
        //   bottom.current.scrollIntoView({ behavior: "smooth" });
        // }
        // else
        // {
        //   const message = {...messagesData.message,user : messagesData.user}
        //   setMessages({rows:[...messages.rows,message],count:messages.count + 1});
        //   bottom.current.scrollIntoView({ behavior: "smooth" });
        // } 
      } 
     
    },[data])

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

    useEffect(() => 
    {
      if(dialog)
      {
        setDialogUser(dialog.users.filter(x => x.id !== userState.id)[0]);
      }
      checkQuery(errorDialog)
    },[isLoadingDialog]);
    useEffect(() => checkQuery(errorMessages),[isLoadingMessages]);


    const notFound = (<Box sx={{ textAlign:"center",p:5}}>
                          <Typography sx={{ display: 'inline'}} component="span" variant="body1" color="text.secondary">
                              Напишите первыми)
                          </Typography>         
                      </Box> )


    return(
      <Grid container sx={{height:'100%'}}>
        <Grid xs={12} md={12} item sx={{height:'0%'}}>
          <StyledRoot sx={{bgcolor:"grey.300" }}>
            <Toolbar>
              <IconButton onClick={() => navigate('/user/chat')} >
                <ArrowLeft/>           
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />

              <Stack direction="row" alignItems="center" spacing={{xs: 0.5,sm: 1}}>
                {
                  dialogUser && <Avatar  sx={{ width: "40px" , height: "40px"}} 
                  alt={`${dialogUser.firstName} ${dialogUser.lastName}`} 
                  src={dialogUser.photo?.path && process.env.REACT_APP_API_URL + dialogUser.photo?.path}  />
                }
                <Stack direction="column"  spacing={0.1} > 
                  <Stack direction="row"  spacing={0.1}>
                    <Typography  variant="subtitle2" color="black">  
                      {dialogUser && `${dialogUser.firstName} ${dialogUser.lastName}`}
                    </Typography> 
                  </Stack>
                </Stack>
              </Stack>
            </Toolbar>
          </StyledRoot>
        </Grid>

        <Grid xs={12} md={12} style={{display:'flex', flexDirection:'column',height:'100%',width:"100%",alignItems:'center',justifyContent:'flex-end'}} item>
              {
                messages?.rows && messages?.count !== 0  ? 
                <MessagesList lastMessageRef={lastMessageRef} listItem={MessageListItem} messagesList={messages?.rows}/>
                : isFethingMessages ? <LineLoader/> : notFound        
              } 
              {
                messages?.rows && messages?.count !== 0 && isFethingMessages &&<LineLoader/> 
              }                                
        </Grid>
        
        <Grid xs={12} md={12}  item sx={{height:'0%'}}>
            <StyledRoot sx={{bgcolor:"grey.300", top: 'auto', bottom: 0 }}>
              <Toolbar>
                <Divider variant="horizontal"/>

                <DialogForm  dialogId={id}/>
              </Toolbar>
                
            </StyledRoot>
            
            
          </Grid>
          <div ref={bottom} style={{height: 0}}/>
        
      </Grid>
  );
}

export default DialogPage;