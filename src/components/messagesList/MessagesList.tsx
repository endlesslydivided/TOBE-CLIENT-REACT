//@ts-nocheck
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, ButtonBase, Card, CardContent, CardHeader, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { FC, ReactNode, useEffect } from 'react';
import { Add, Check, Close, DateRange, Delete, Language, LocationCity, Wc } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import { DateTimePicker } from '@mui/lab';
import { Stack } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { useCreateFriendMutation, useDeleteFriendMutation, useUpdateFriendMutation } from '../../services/FriendsApiSlice';
import { toast } from 'react-toastify';
import { useCreateDialogMutation } from '../../services/DialogsApiSlice';
import { fDateTime } from '../../utils/formatTime';


interface IMessagesListProps
{
    messagesList: any;
    listItem: any;
    sx?: object;
}

interface IMessagesListItemProps
{
    message: any;
    userState: any;
}

const checkStatus = (status,successMessage) => 
    {
        if (status.isSuccess) 
        {
          toast.success(successMessage);
        }
  
        if (status.isError) 
        {
          if (Array.isArray((status.error as any).data.error)) 
          {
            (status.error as any).data.error.forEach((el: any) =>toast.error(el.message, {position: 'top-right',}));
          } 
          else 
          {
            toast.error((status.error as any).data.message, {position: 'top-right',});
          }
        }
};


const MessagesList:FC<IMessagesListProps>= ({messagesList,listItem:ListItem,...other}) => {
  
  const userState :any = useAppSelector(state => state.auth.user);

  return (
    <List disablePadding sx={{ p: 1 }}>
        {
            messagesList.map((message:any,index:number) =>
                <>
                    <ListItem message={message} userState={userState}/>
                </>            
            )
        }
    </List>
  );
}


export const  MessageListItem:FC<IMessagesListItemProps> = ({message,userState}) => 
{
  return (
    <ListItem  key={message.id}>
      <Grid container alignItems="center"   justifyContent="end" spacing={1}>
        <Grid item xs={9} > 
          <ListItemText 
            sx={{py:0.2}}
            secondaryTypographyProps={{mt:0.5}}
            primary={`${message.user.firstName} ${message.user.lastName}`}
            secondary={
                <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.secondary">
                    {fDateTime(message.createdAt)}
                </Typography>         
            }
          /> 
          <ListItemText 
            secondaryTypographyProps={{mt:0.5}}
            primary={`${message.text}`}
          /> 
        </Grid>
      </Grid>
    </ListItem>
  );
}


export default MessagesList;