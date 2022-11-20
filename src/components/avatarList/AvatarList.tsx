import { useTheme, styled } from '@mui/material/styles';
import { Avatar, ButtonBase, Card, CardContent, CardHeader, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Add, DateRange, Language, LocationCity, Wc } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import { DateTimePicker } from '@mui/lab';
import { Stack } from '@mui/system';
import { Link } from 'react-router-dom';


interface IAvatarListProps
{
    membersList: any;
    sx?: object;
}

interface IAvatarListItemProps
{
    member: any;
}
const AvatarList:FC<IAvatarListProps>= ({membersList,...other}) => {
  
  return (
    <List disablePadding sx={{ p: 1 }}>
        {
            membersList.map((member:any,index:number) =>
                <><>
                    <AvatarListItem member={member}/>
                    <Divider variant="fullWidth" component="li" />
                </>
                <>
                    <AvatarListItem member={member}/>
                    <Divider variant="fullWidth" component="li" />
                </>
                <>
                    <AvatarListItem member={member}/>
                    {index !== membersList.length - 1 && <Divider variant="fullWidth" component="li" />}
                </>
                </>             
            )
        }

    </List>
  );
}

const  AvatarListItem:FC<IAvatarListItemProps> = ({member}) => 
{

  return (
    <ListItem  key={member.id}>
      <Grid container alignItems="center"   justifyContent="center" spacing={1}>
        <Grid item xs>
          <Link to={`/user/users/${member.id}`}>
          <ListItemAvatar   sx={{m:0}}>
            <Avatar  sx={{ width: 125, height: 125,ml:2 }} alt={`${member.firstName} ${member.lastName}`} src={process.env.REACT_APP_API_URL + member?.photo.path}  />
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
                <ListItemButton  component="a" href="#simple-list">
                    <ListItemText sx={{textAlign:'center'}}  primary="Написать сообщение" />
                </ListItemButton>
                <Divider orientation="vertical" flexItem />
                <ListItemButton component="a" href="#simple-list">
                    <ListItemText sx={{textAlign:'center'}}  primary="Добавить в друзья" />
                </ListItemButton>
            </Box>
        </Grid>
      </Grid>
    </ListItem>
  );
}


export default AvatarList;