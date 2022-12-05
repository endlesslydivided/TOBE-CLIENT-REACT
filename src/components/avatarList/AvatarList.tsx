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

const checkStatus = (status,successMessage) => 
    {
        if (status.isSuccess && successMessage) 
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
  const [createDialog,createDialogStatus] = useCreateDialogMutation();
  const [deleteFriend,deleteFriendStatus] = useDeleteFriendMutation();

  useEffect(() => checkStatus(createFriendStatus,`Друг добавлен`),[createFriendStatus.isLoading]);
  useEffect(() => checkStatus(createDialogStatus),[createDialogStatus.isLoading]);
  useEffect(() => checkStatus(deleteFriendStatus,`Друг удалён`),[deleteFriendStatus.isLoading]);

  const writeMessageHandler=  async () =>
  {
    const {data} = await createDialog({name:`${member.firstName} ${member.lastName}`,isChat:false,creatorId:userState.id,usersId:[member.id]});
    if(data)
    {
      navigate(`/user/chat/${data.dialog.id}`);
    }
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
            {userState.id !== member.id &&
            ( <Box display="flex" >
            <ListItemButton sx={{bgcolor:"grey.200",borderRadius:"10px 0 0 10px",width:"50%"}}  component="a" onClick={() => writeMessageHandler()}>
              <ListItemText sx={{textAlign:'center'}}  primary="Написать сообщение" />
            </ListItemButton>
            <Divider orientation="vertical" flexItem />
            <ListItemButton sx={{bgcolor:"grey.200",borderRadius:"0 10px 10px 0",justifyContent:"center",width:"50%"}}  component="a" 
            onClick={() => friendClickHandler(member.id)}>
              <Box sx={{display:"flex"}}>
              {renderButton(member?.id)}
              </Box>
            </ListItemButton>
          </Box>)
            }
           
        </Grid>
      </Grid>
    </ListItem>
  );
}

export const  FriendsListItem:FC<IAvatarListItemProps> = ({member,userState}) => 
{
  const navigate = useNavigate();
  const [createDialog,createDialogStatus] = useCreateDialogMutation();
  useEffect(() => checkStatus(createDialogStatus),[createDialogStatus.isLoading]);

  const writeMessageHandler=  async () =>
  {
    const {data} = await createDialog({name:`${member.user?.firstName} ${member.user?.lastName}`,isChat:false,creatorId:userState.id,usersId:[member.user?.id]});
    if(data)
    {
      navigate(`/user/chat/${data.dialog.id}`);
    }
  }

  return (
    <ListItem  key={member.user?.id}>
      <Grid container alignItems="center"   justifyContent="center" spacing={1}>
        <Grid item xs>
          <Link to={`/user/users/${member.user?.id}`}>
          <ListItemAvatar   sx={{m:0}}>
            <Avatar  sx={{ width: 125, height: 125,ml:2 }} alt={`${member.user?.firstName} ${member.user?.lastName}`} 
            src={member.user?.photo?.path && process.env.REACT_APP_API_URL + member.user?.photo?.path}  />
          </ListItemAvatar>
          </Link>
        </Grid>
        <Grid item xs={9} > 
            <ListItemText
              secondaryTypographyProps={{mt:0.5}}
              primary={`${member.user?.firstName} ${member.user?.lastName}`}
              secondary={
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.secondary">
                    {member.user?.email}
                  </Typography>         
              }
            />
            <Box display="flex">
              <ListItemButton sx={{bgcolor:"grey.200",borderRadius:"10px",justifyContent:"center"}}  component="a" onClick={() => writeMessageHandler()}>
                <ListItemText sx={{textAlign:'center'}}  primary="Написать сообщение" />
              </ListItemButton>
            </Box>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export const  RequestListItem:FC<IAvatarListItemProps> = ({member,userState}) => 
{
  const [updateFriend,updateFriendStatus] = useUpdateFriendMutation();
  
  useEffect(() => checkStatus(updateFriendStatus,`Друг обновлён`),[updateFriendStatus.isLoading]);
  
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
          return (<><Delete/><ListItemText sx={{textAlign:'center',m:0}}  primary="Удалить из друзей" /></>);
        }
        return (<><Check/><ListItemText sx={{textAlign:'center',m:0}}  primary="Заявка отправлена"/></>);
      }
      return (<><Add/><ListItemText sx={{textAlign:'center',m:0}} primary="Добавить в друзья"/></>);
    }

  return (
    <ListItem  key={member.user?.id}>
      <Grid container alignItems="center"  justifyContent="center" spacing={1}>
        <Grid item xs>
          <Link to={`/user/users/${member.user?.id}`}>
          <ListItemAvatar   sx={{m:0}}>
            <Avatar  sx={{ width: 125, height: 125,ml:2 }} alt={`${member.user?.firstName} ${member.user?.lastName}`} 
            src={member.user?.photo?.path && process.env.REACT_APP_API_URL + member.user?.photo?.path}  />
          </ListItemAvatar>
          </Link>
        </Grid>
        <Grid item xs={9} > 
            <ListItemText
              secondaryTypographyProps={{mt:0.5}}
              primary={`${member.user?.firstName} ${member.user?.lastName}`}
              secondary={
                  <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.secondary">
                    {member.user?.email}
                  </Typography>         
              }
            />
              <Box display="flex" >
                <ListItemButton sx={{bgcolor:"grey.200",borderRadius:"10px 0 0 10px",justifyContent:"center",width:"50%"}}  component="a" 
                onClick={() => updateFriend({id:member.id,dto:{isRejected:true}})}>
                <Box sx={{display:"flex",m:0.5}}>
                    <Close/><ListItemText  primary="Отклонить заявку" sx={{m:0}} />
                </Box>
                </ListItemButton>
                <Divider orientation="vertical" flexItem />
                <ListItemButton sx={{bgcolor:"grey.200",borderRadius:"0 10px 10px 0",justifyContent:"center",width:"50%"}}  component="a" 
                  onClick={() => updateFriend({id:member.id,dto:{isRejected:false}})}>
                  <Box sx={{display:"flex"}}>
                    <Check/><ListItemText  primary="Принять заявку" sx={{m:0}} />
                  </Box>
                </ListItemButton>
              </Box>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export const  DialogListItem:FC<IAvatarListItemProps> = ({member,userState}) => 
{

  return (
    <Link  style={{textDecoration: 'none'}}  to={`/user/chat/${member.id}`}>

    <ListItem  key={member.id}>
        <Grid container alignItems="center"   justifyContent="center" spacing={1}>
          <Grid item xs> 
     
            <Stack direction="row" sx={{mx:2}} spacing={2} > 
              <ListItemAvatar>
                {
                  member.isChat ?
                  <Avatar  sx={{ width: "50px" , height: "50px" }} alt={`${member.name}`} 
                  src={member?.users[0]?.photo?.path && process.env.REACT_APP_API_URL + member?.users[0]?.photo?.path}  /> :
                  <Avatar  sx={{ width: "50px" , height: "50px" }} alt={`${member.users[0]?.firstName} ${member.users[0]?.lastName}`} 
                  src={member?.users[0]?.photo?.path && process.env.REACT_APP_API_URL + member?.users[0]?.photo?.path}  />
                }
               
              </ListItemAvatar>
              
              <ListItemText
              sx={{py:0.2}}  
                secondaryTypographyProps={{mt:0.5}}
                primary={member.isChat ? `${member.name}` : `${member.users[0]?.firstName} ${member.users[0]?.lastName}`}
                secondary={
                    <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.secondary">
                      {member.messages.length !== 0 ? member.messages[0].text : 'Нет сообщений'}
                    </Typography>         
                }
              />         
            </Stack> 
          </Grid>
        </Grid>
    </ListItem>
    </Link>

  );
}



export default AvatarList;