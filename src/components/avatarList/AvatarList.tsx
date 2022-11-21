//@ts-nocheck
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, ButtonBase, Card, CardContent, CardHeader, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Add, Check, DateRange, Delete, Language, LocationCity, Wc } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import { DateTimePicker } from '@mui/lab';
import { Stack } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { useCreateFriendMutation, useDeleteFriendMutation, useUpdateFriendMutation } from '../../services/FriendsApiSlice';


interface IAvatarListProps
{
    membersList: any;
    listItem: any;
    sx?: object;
}

interface IAvatarListItemProps
{
    member: any;
    userState: any;
}
const AvatarList:FC<IAvatarListProps>= ({membersList,listItem:ListItem,...other}) => {
  
  const userState :any = useAppSelector(state => state.auth.user);

  return (
    <List disablePadding sx={{ p: 1 }}>
        {
            membersList.map((member:any,index:number) =>
                <>
                    <ListItem member={member} userState={userState}/>
                    {index !== membersList.length - 1 && <Divider variant="fullWidth" component="li" />}
                </>            
            )
        }
    </List>
  );
}


export const  UsersListItem:FC<IAvatarListItemProps> = ({member,userState}) => 
{
  const navigate = useNavigate();

  const [createFriend,createFriendStatus] = useCreateFriendMutation();
  const [updateFriend,updateFriendStatus] = useUpdateFriendMutation();
  const [deleteFriend,deleteFriendStatus] = useDeleteFriendMutation();

  const writeMessageHandler= () =>
  {
    navigate(`/chat/${member.id}`);
  }

  const findFriend= (friendId) => userState?.friends?.find((x) => x.friendId === friendId);

  const friendClickHandler = (friendId) =>
  {
    const friendEntry = findFriend(friendId);
    if(friendEntry)
    {
      return deleteFriend({is:friendEntry.id});
    }
    return createFriend({userId:userState.id,friendId});
  }

  const renderButton = (friendId) =>
  {
    const friendEntry = findFriend(friendId);
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
    <ListItem  key={member.id}>
      <Grid container alignItems="center"   justifyContent="center" spacing={1}>
        <Grid item xs>
          <Link to={`/user/users/${member.id}`}>
          <ListItemAvatar   sx={{m:0}}>
            <Avatar  sx={{ width: 125, height: 125,ml:2 }} alt={`${member.firstName} ${member.lastName}`} 
            src={member?.photo?.path && process.env.REACT_APP_API_URL + member?.photo?.path}  />
          </ListItemAvatar>
          </Link>
        </Grid>
        <Grid item xs={9} > 
            <ListItemText
              secondaryTypographyProps={{mt:0.5}}
              primary={`${member.firstName} ${member.lastName}`}
              secondary={
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.secondary">
                    {member.email}
                  </Typography>         
              }
            />
            <Box display="flex" >
              <ListItemButton sx={{bgcolor:"grey.200",borderRadius:"10px 0 0 10px",width:"50%"}}  component="a" onClick={() => writeMessageHandler()}>
                <ListItemText sx={{textAlign:'center'}}  primary="Написать сообщение" />
              </ListItemButton>
              <Divider orientation="vertical" flexItem />
              <ListItemButton sx={{bgcolor:"grey.200",borderRadius:"0 10px 10px 0",justifyContent:"center",width:"50%"}}  component="a" 
              onClick={() => friendClickHandler(member.id)}>
                <Box sx={{display:"flex"}}>
                {renderButton(member.id)}
                </Box>
              </ListItemButton>
            </Box>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export const  FriendsListItem:FC<IAvatarListItemProps> = ({member,userId}) => 
{
  const navigate = useNavigate();

  const writeMessageHandler= () =>
  {
    navigate(`/chat/${member.id}`);
  }

  const addFridendHandler= () =>
  {
    navigate(`/chat/${member.id}`);
  }

  return (
    <ListItem  key={member.id}>
      <Grid container alignItems="center"   justifyContent="center" spacing={1}>
        <Grid item xs>
          <Link to={`/user/users/${member.id}`}>
          <ListItemAvatar   sx={{m:0}}>
            <Avatar  sx={{ width: 125, height: 125,ml:2 }} alt={`${member.firstName} ${member.lastName}`} 
            src={member?.photo?.path && process.env.REACT_APP_API_URL + member?.photo?.path}  />
          </ListItemAvatar>
          </Link>
        </Grid>
        <Grid item xs={9} > 
            <ListItemText
              secondaryTypographyProps={{mt:0.5}}
              primary={`${member.firstName} ${member.lastName}`}
              secondary={
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.secondary">
                    {member.email}
                  </Typography>         
              }
            />
            <Box display="flex">
              <ListItemButton sx={{bgcolor:"grey.200",borderRadius:"10px"}}  component="a" onClick={() => writeMessageHandler()}>
                <ListItemText sx={{textAlign:'center'}}  primary="Написать сообщение" />
              </ListItemButton>
            </Box>
        </Grid>
      </Grid>
    </ListItem>
  );
}


export default AvatarList;