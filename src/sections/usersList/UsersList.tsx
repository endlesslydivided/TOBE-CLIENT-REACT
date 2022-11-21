import { styled } from  '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, List, ListItemText, Tab, Tabs } from '@mui/material';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Add, DateRange, Language, LocationCity, Wc } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import { DateTimePicker } from '@mui/lab';
import AvatarList from '../../components/avatarList';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useGetPagedUsersQuery } from '../../services/UsersApiSlice';
import FullScreenLoader from '../../components/FullScreenLoader';
import { FriendsListItem, UsersListItem } from '../../components/avatarList/AvatarList';
import { useAppSelector } from '../../hooks/redux';

interface IUserListProps
{
    sex?: string,
    age?: number,
    sx?: object;
}

interface ITabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
    sx?:any
  }

const UsersList:FC<IUserListProps>= ({...other}) => {
  
    const [value, setValue] = useState(0);

    const [limit,setLimit] = useState(10);
    const [page,setPage] = useState(1);

    const userState :any = useAppSelector(state => state.auth.user);


    const { data:users, error:errorUsers, isLoading:isLoadingUsers }  = useGetPagedUsersQuery({limit,page});
    const { data:friends, error:errorFriends, isLoading:isLoadingFriends }  = useGetPagedUsersQuery({limit,page});

    const dispatch = useDispatch();

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


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };


    return (
            <Card {...other}>
                <Tabs variant="fullWidth" value={value} onChange={handleChange}>
                    <Tab label={`Пользователи ${users?.count ? users?.count - 1 : 0}`} />
                    <Tab label={`Друзья ${friends?.count ? friends?.count : 0}`} />
                </Tabs>
                <CardContent  sx={{ p: 1,pb:0 }}>
                    <TabPanel value={value} index={0}>
                        {
                            isLoadingUsers ? <FullScreenLoader/> :
                            users?.rows ? <AvatarList listItem={UsersListItem} membersList={users?.rows.filter((x:any)=> x.id !== userState.id)}/> : 
                            <Box sx={{ textAlign:"center",p:5}}>
                                <Typography sx={{ display: 'inline'}} component="span" variant="body1" color="text.secondary">
                                    Ничего не найдено
                                </Typography>         
                            </Box>        
                        }
                        
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        {
                        isLoadingFriends ? <FullScreenLoader/> :
                        friends?.rows ? <AvatarList listItem={FriendsListItem} membersList={friends?.rows.filter((x:any) => x.id !== userState.id)}/> : 
                        <Typography>Ничего не найдено</Typography>
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