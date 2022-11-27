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
    <List >
        {
            newsList.map((post:any,index:number) =>
                <>
                    <ListItem  post={post} userState={userState}/>
                </>            
            )
        }
    </List>
  );
}

export const  FeedListItem:FC<INewsListItemProps> = ({post,userState,...other}) => 
{
  const navigate = useNavigate();

  return (
    <ListItem {...other} sx={{px:0}}  key={post.id}>
        <Card sx={{width:"100%"}}>
            <CardContent>
                <Grid container alignItems="center" sx={{padding: 0,'& .MuiGrid-item': { padding:0},}}   justifyContent="center"spacing={5} >
                    <Grid item xs={1}>
                        <Link to={`/user/users/${post?.user?.id}`}>
                            <ListItemAvatar   sx={{m:2}}>
                                <Avatar  sx={{ width: 50, height: 50 }} alt={`${post.user.firstName} ${post.user.lastName}`} 
                                src={post?.user?.photo?.path && process.env.REACT_APP_API_URL + post?.user.photo?.path}  />
                            </ListItemAvatar>
                        </Link>
                    </Grid>
                    <Grid item xs={11} > 
                        <ListItemText
                        secondaryTypographyProps={{mt:0.5}}
                        primary={`${post.user.firstName} ${post.user.lastName}`}
                        secondary={
                            <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.secondary">
                                {fDateTime(post.createdAt)}
                            </Typography>         
                        }
                        />

                    </Grid>
                    <Grid item xs={12} > 
                        <ListItemText
                        secondaryTypographyProps={{mt:0.5}}
                        primary={`${post.content}`}
                        
                        />

                    </Grid>
                </Grid>
            </CardContent>
        </Card>
     
    </ListItem>
  );
}

export default NewsList;