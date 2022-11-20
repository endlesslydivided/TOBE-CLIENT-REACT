import { useTheme, styled } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, List, ListItemText } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Add, DateRange, Language, LocationCity, Wc } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import { StyledListItem, StyledListItemIcon } from './styles';
import { DateTimePicker } from '@mui/lab';


interface IUserDataProps
{
    userState: any;
    sx?: object;
}

interface IUserDataItemProps
{
  value: string;
  icon: ReactNode;
  property:string;
}
const UserData:FC<IUserDataProps>= ({userState,...other}) => {
  

    return (
        <Card {...other}>
            <CardHeader title={`${userState.firstName} ${userState.lastName}`} subheader={userState.email}/>
            <Divider  sx={{ mt: 1 }}/>
            <CardContent  sx={{ p: 0 }}>
                <List disablePadding sx={{ p: 1 }}>
                  <ListItem value="09.04.2002" property="День рождения" icon={<DateRange/>}/>
                  <ListItem value={userState.sex === 'M' ? 'Мужской' : 'Женский'} property="Пол" icon={<Wc/>}/>

                  <ListItem value={userState.country} property="Страна" icon={<Language/>}/>
                  <ListItem value={userState.city} property="Город" icon={<LocationCity/>}/>

                </List>
            </CardContent>
            
        </Card>
  );
}

const  ListItem:FC<IUserDataItemProps> = ({value,icon,property}) => 
{

  return (
    <StyledListItem>
      <StyledListItemIcon>{icon && icon}</StyledListItemIcon>
      <ListItemText disableTypography primary={`${property}:\t${value}`} />

      {/* {info && info} */}
    </StyledListItem>
  );
}


export default UserData;