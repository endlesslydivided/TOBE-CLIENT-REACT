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
import {fDateTime} from '../../utils/formatTime'

interface INewsListProps
{
    newsList: any;
    listItem: any;
    sx?: object;
}

interface INewsListItemProps
{
    post: any;
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


const NewsList:FC<INewsListProps>= ({newsList,listItem:ListItem,...other}) => {
  
  const userState :any = useAppSelector(state => state.auth.user);

  return (
    <List disablePadding sx={{ p: 1 }}>
        {
            postsList.map((post:any,index:number) =>
                <>
                    <ListItem post={post} userState={userState}/>
                    {index !== postsList.length - 1 && <Divider variant="fullWidth" component="li" />}
                </>            
            )
        }
    </List>
  );
}

export const  FeedListItem:FC<INewsListItemProps> = ({post,userState}) => 
{
  const navigate = useNavigate();
  const [createFriend,createFriendStatus] = useCreateFriendMutation();
  const [deleteFriend,deleteFriendStatus] = useDeleteFriendMutation();

  useEffect(() => checkStatus(createFriendStatus,`Друг добавлен`),[createFriendStatus.isLoading]);
  useEffect(() => checkStatus(deleteFriendStatus,`Друг удалён`),[deleteFriendStatus.isLoading]);

  const writeMessageHandler= () =>
  {
    navigate(`/chat/${post.id}`);
  }

  const findFriend=  (friendId) =>  userState?.friends?.find((x) => x.friendId === friendId);

  const friendClickHandler = (friendId) =>
  {
    const friendEntry = findFriend(friendId);
    if(friendEntry)
    {
      return deleteFriend({id:friendEntry.id});
    }
    return createFriend({userId:userState.id,friendId});
  }

  const renderButton = (friendId) =>
  {
    const friendEntry =  findFriend(friendId);
    if(friendEntry)
    {
      if(friendEntry.isRejected === false)
      {
        return (<><Delete/><ListItemText  primary="Удалить из друзей" sx={{m:0}} /></>);
      }
      return (<><Check/><ListItemText  primary="Заявка отправлена" sx={{m:0}} /></>);
    }
    return (<><Add/><ListItemText  primary="Добавить в друзья" sx={{m:0}} /></>);
  }

  return (
    <ListItem  key={post.id}>
        <Card>
            <CardContent>
                <Grid container alignItems="center"   justifyContent="center" spacing={1}>
                    <Grid item xs={2}>
                        <Link to={`/user/users/${post?.user?.id}`}>
                            <ListItemAvatar   sx={{m:0}}>
                                <Avatar  sx={{ width: 50, height: 50,ml:2 }} alt={`${post.user.firstName} ${post.user.lastName}`} 
                                src={post?.user?.photo?.path && process.env.REACT_APP_API_URL + post?.user.photo?.path}  />
                            </ListItemAvatar>
                        </Link>
                    </Grid>
                    <Grid item xs={10} > 
                        <ListItemText
                        secondaryTypographyProps={{mt:0.5}}
                        primary={`${post.firstName} ${post.lastName}`}
                        secondary={
                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.secondary">
                                {fDateTime(post.createdAt)}
                            </Typography>         
                        }
                        />
                        {userState.id !== post.id &&
                        ( <Box display="flex" >
                        <ListItemButton sx={{bgcolor:"grey.200",borderRadius:"10px 0 0 10px",width:"50%"}}  component="a" onClick={() => writeMessageHandler()}>
                        <ListItemText sx={{textAlign:'center'}}  primary="Написать сообщение" />
                        </ListItemButton>
                        <Divider orientation="vertical" flexItem />
                        <ListItemButton sx={{bgcolor:"grey.200",borderRadius:"0 10px 10px 0",justifyContent:"center",width:"50%"}}  component="a" 
                        onClick={() => friendClickHandler(post.id)}>
                        <Box sx={{display:"flex"}}>
                        {renderButton(post?.id)}
                        </Box>
                        </ListItemButton>
                    </Box>)
                        }
                    
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
     
    </ListItem>
  );
}

export default NewsList;