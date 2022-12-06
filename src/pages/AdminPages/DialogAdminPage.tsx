//@ts-nocheck
import { Divider,Fab, IconButton,Toolbar } from '@mui/material';
import { FC,  useCallback, useEffect, useRef, useState } from 'react';
import {  ArrowLeft,  KeyboardArrowDown,    } from '@mui/icons-material';
import { Box,  Grid, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { useAppSelector } from '../../hooks/redux';
import LineLoader from '../../components/LineLoader';
import {useLazyGetMessagesQuery } from '../../services/ChatApiSlice';
import MessagesList from '../../components/messagesList';
import { MessageListItem } from '../../components/messagesList/MessagesList';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DialogForm from '../../sections/chat/DialogForm';
import { useGetOneDialogQuery } from '../../services/DialogsApiSlice';
import { Avatar } from '@material-ui/core';
import { Stack } from '@mui/system';
import ScrollBottom from '../../components/ui/ScrollBottom';
import { StyledRoot } from '../../layouts/adminDashboard/header';

interface IDialogSectionProps
{

}

const initialFilters=
{
    search: '',
    lastDate: Date.Now,
    limit: 10,
    fixedLimit: 10,
    orderBy:'createdAt',
    orderDirection: 'DESC',
}

const DialogAdminPage:FC<IDialogSectionProps>= ({...other}) => {
  
    const userState :any = useAppSelector(state => state.auth.user);

    const {id} = useParams();
    const [filters,setFilters] = useState(initialFilters)
    const [messages,setMessages] = useState({rows:[],count:0});
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
        const beforeMessages =[...data.rows].filter(x => x?.sent);
        const afterMessages =[...data.rows].filter(x => !x?.sent).reverse();
        const newMessagesBefore = beforeMessages.filter(message => !messages.rows.some(x => message.id === x.id));
        const newMessagesAfter = afterMessages.filter(message => !messages.rows.some(x => message.id === x.id));
        const setNewMessageArr = [...newMessagesAfter,...messages.rows,...newMessagesBefore];

        setMessages({rows:setNewMessageArr,count:1});
        setFilters(previous => ({...previous,lastDate:setNewMessageArr[0]?.createdAt}));
        setCountLeft(data.count);
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
        <Grid xs={12} md={12} item sx={{height:'10%'}}>
          <StyledRoot sx={{bgcolor:"grey.300" }}>
            <Toolbar>
              <IconButton onClick={() => navigate('/admin')} >
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

              <Box sx={{ flexGrow: 1.2 }} />
            </Toolbar>
          </StyledRoot>
        </Grid>

        <Grid xs={12} md={12} style={{display:'flex', flexDirection:'column',height:'80%',width:"100%",alignItems:'center',justifyContent:'flex-end'}} item>
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
              <ScrollBottom >
                  <Fab size="large" color="info" aria-label="scroll back to bottom">
                      <KeyboardArrowDown />
                  </Fab>
              </ScrollBottom>
            </Toolbar>
              
          </StyledRoot>                      
        </Grid>        
       
      </Grid>
  );
}

export default DialogAdminPage;