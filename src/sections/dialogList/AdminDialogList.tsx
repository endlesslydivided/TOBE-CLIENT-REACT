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
import { useGetPagedAvoidedRequestsByUserQuery, useGetPagedDialogsByUserQuery, useGetPagedFriendsByUserQuery, useGetPagedFriendsRequestsByUserQuery, useGetPagedUsersQuery } from '../../services/UsersApiSlice';
import FullScreenLoader from '../../components/FullScreenLoader';
import { AdminDialogListItem, DialogListItem, FriendsListItem, RequestListItem, UsersListItem } from '../../components/avatarList/AvatarList';
import { useAppSelector } from '../../hooks/redux';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/search/Search';
import SearchIcon from '@mui/icons-material/Search';
import { ObjectPair } from 'zod';
import LineLoader from '../../components/LineLoader';

interface IDialogListProps
{
    sex?: string,
    age?: number,
    sx?: object,
    filters: object,
    setFilters: Function
}


const AdminDialogList:FC<IDialogListProps>= ({filters,setFilters,...other}) => 
{
  const userState :any = useAppSelector(state => state.auth.user);

  const [dialogs,setDialogs] = useState({rows:[],count:0});
  const [totalPages, setTotalPages] = useState(0);

  const lastElement = useRef()
  const { data, error:errorDialogs,isSuccess:isSuccessDialogs, isLoading:isLoadingDialogs,isFetching:isFethingDialogs}  = 
  useGetPagedDialogsByUserQuery({id:userState.id,filters:filters},{refetchOnMountOrArgChange:true});

  const lastDialogRef = useCallback(dialog =>
    {
      if(isLoadingDialogs) return;

      if(lastElement.current) lastElement.current.disconnect();

      lastElement.current = new IntersectionObserver(dialogs=>
        {
          if(dialogs[0].isIntersecting && filters.page < totalPages)
          {
            setFilters(previous => ({...previous, page: previous.page + 1}));
          }
        })

      if (dialog) lastElement.current.observe(dialog);
    },[isLoadingDialogs,totalPages])

  useEffect(() => 
  {
    if(isSuccessDialogs && data)
    {
      setDialogs({rows:[...dialogs.rows,...data.rows],count:data.count});
      setTotalPages(Math.ceil(data.count /  filters.limit));
    }
    
  },[isSuccessDialogs])

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

  useEffect(() => checkQuery(errorDialogs),[isLoadingDialogs]);


  const notFound = (<Box sx={{ textAlign:"center",p:5}}>
                        <Typography sx={{ display: 'inline'}} component="span" variant="body1" color="text.secondary">
                            Ничего не найдено
                        </Typography>         
                    </Box> )


  return(
    <Card {...other}>                     
      <CardContent  sx={{ p: 1,pb:0 }}>
      {
        dialogs?.rows && dialogs?.count !== 0  ? 
        <AvatarList listItem={AdminDialogListItem} membersList={dialogs?.rows}/>
        : isFethingDialogs ? <LineLoader/> : notFound        
      } 
       {
        dialogs?.rows && dialogs?.count !== 0  ? 
        <AvatarList listItem={AdminDialogListItem} membersList={dialogs?.rows}/>
        : isFethingDialogs ? <LineLoader/> : notFound        
      } 
        <div ref={lastDialogRef} style={{height: 0}}/>
      {
        dialogs?.rows && dialogs?.count !== 0 && isFethingDialogs &&<LineLoader/> 
      }                      
      </CardContent>               
    </Card>
  );
}

export default AdminDialogList;