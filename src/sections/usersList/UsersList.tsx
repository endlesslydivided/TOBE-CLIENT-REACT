import { styled } from  '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, FormControlLabel, FormGroup, List, ListItemText, Switch, Tab, Tabs } from '@mui/material';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Add, DateRange, Language, LocationCity, Wc } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import { DateTimePicker } from '@mui/lab';
import AvatarList from '../../components/avatarList';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useGetPagedAvoidedRequestsByUserQuery, useGetPagedFriendsByUserQuery, useGetPagedFriendsRequestsByUserQuery, useGetPagedUsersQuery } from '../../services/UsersApiSlice';
import FullScreenLoader from '../../components/FullScreenLoader';
import { FriendsListItem, RequestListItem, UsersListItem } from '../../components/avatarList/AvatarList';
import { useAppSelector } from '../../hooks/redux';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/search/Search';
import SearchIcon from '@mui/icons-material/Search';
import { ObjectPair } from 'zod';

interface IUserListProps
{
    sex?: string,
    age?: number,
    sx?: object,
    filters: object
}

interface ITabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
    sx?:any
  }

const UsersList:FC<IUserListProps>= ({filters,...other}) => {
  
    const [value, setValue] = useState(0);

    const [checkRequest,setCheckRequest] = useState(false);

    const userState :any = useAppSelector(state => state.auth.user);


    const { data:users, error:errorUsers, isLoading:isLoadingUsers, }  = useGetPagedUsersQuery(filters,{refetchOnMountOrArgChange:true});
    const { data:friends, error:errorFriends, isLoading:isLoadingFriends }  = useGetPagedFriendsByUserQuery({id:userState.id,filters:filters},{refetchOnMountOrArgChange:true});
    const { data:requests, error:errorRequests, isLoading:isLoadingRequests}  = useGetPagedFriendsRequestsByUserQuery({id:userState.id,filters:filters},{refetchOnMountOrArgChange:true});
    const { data:avoided, error:errorAvoided, isLoading:isLoadingAvoided}  = useGetPagedAvoidedRequestsByUserQuery({id:userState.id,filters:filters},{refetchOnMountOrArgChange:true});


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

    useEffect(() => checkQuery(errorUsers),[isLoadingUsers]);
    useEffect(() => checkQuery(errorFriends),[isLoadingFriends]);
    useEffect(() => checkQuery(errorRequests),[isLoadingRequests]);
    useEffect(() => checkQuery(errorAvoided),[isLoadingAvoided]);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const notFound = (<Box sx={{ textAlign:"center",p:5}}>
                          <Typography sx={{ display: 'inline'}} component="span" variant="body1" color="text.secondary">
                              Ничего не найдено
                          </Typography>         
                      </Box> )


    return (
            <Card {...other}>
                <Tabs variant="fullWidth" value={value} onChange={handleChange}>
                    <Tab label={`Пользователи ${users?.count ? users?.count : 0}`} />
                    <Tab label={`Друзья ${friends?.count ? friends?.count : 0}`} />
                    <Tab label={`Заявки ${requests?.count ? requests?.count : 0}`} />

                </Tabs>
                <CardContent  sx={{ p: 1,pb:0 }}>
                    <TabPanel value={value} index={0}>
                        {
                          isLoadingUsers ? <FullScreenLoader/> :
                          users?.rows && users?.count !== 0  ? <AvatarList listItem={UsersListItem} membersList={users?.rows}/> : 
                          notFound    
                        }
                        
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {
                          isLoadingFriends ? <FullScreenLoader/> :
                          friends?.rows && friends?.count !== 0 ? <AvatarList listItem={FriendsListItem} membersList={friends?.rows}/> : 
                          notFound     
                        }
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                    <FormGroup sx={{mx:2}}>
                          <FormControlLabel control=
                          {<Switch onChange={() => setCheckRequest(!checkRequest)} checked={checkRequest}/>} 
                          label="Отвергнутые заявки" />
                    </FormGroup>
                        {
                          checkRequest ? 
                          (
                            isLoadingAvoided ? <FullScreenLoader/> :
                            avoided?.rows && avoided?.count !== 0 ? <AvatarList listItem={RequestListItem} membersList={avoided?.rows}/> : 
                            notFound      
                          )
                          :
                          (
                            isLoadingRequests ? <FullScreenLoader/> :
                            requests?.rows && requests?.count !== 0 ? <AvatarList listItem={RequestListItem} membersList={requests?.rows}/> : 
                            notFound      
                          )
                          
                        }
                    </TabPanel>
                </CardContent>
            
                
            </Card>
  );
}


  
const  TabPanel: FC<ITabPanelProps> = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        
      >
        {value === index && (
          <>
            {children}
          </>
        )}
      </Box>
    );
  }


export default UsersList;