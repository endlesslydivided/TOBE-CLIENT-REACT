//@ts-nocheck
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import { FC, useEffect } from 'react';
import { Add, EmojiEmotions } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import DragZone from '../../../components/dragZone';
import { useCreatePhotoMutation } from '../../../services/PhotosApiSlice';
import { useCreateAlbumMutation } from '../../../services/AlbumsApiSlice';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { selectCurrentAlbum, setCurrentAlbum } from '../../../store/reducers/AlbumSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks/redux';
import { setCurrentPhoto } from '../../../store/reducers/PhotoSlice';
import FileButton from '../../../components/fileButton/FileButton';
import { useUpdateUserMutation } from '../../../services/UsersApiSlice';
import { setCredentials } from '../../../store/reducers/AuthSlice';
import { IUser } from '../../../models/IUser';

interface IUserMainPhotoProps
{
    userState: any;
    sx?: object;
}


const UserMainPhoto:FC<IUserMainPhotoProps> = ({userState,...other}) => 
{
  
  return (
    <Card {...other}>
      {
        userState?.photo ?
        <Image src={process.env.REACT_APP_API_URL + userState?.photo.path} 
        bgColor="whitesmoke" fit="cover"
        />
        :
        <Box sx={{height:"50vh",width:"100%",alignItems:"center",display:"flex",flexDirection:"column-reverse", justifyContent:"center",
        color:"grey.500"}}>
          <Typography>Фото отсутствует</Typography>
          <EmojiEmotions/>
        </Box>
      }
    </Card>
  );
}

export default UserMainPhoto;