import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import { FC, useEffect } from 'react';
import { Add } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import DragZone from '../../components/dragZone';
import { useCreatePhotoMutation } from '../../services/PhotosApiSlice';
import { useCreateAlbumMutation } from '../../services/AlbumsApiSlice';
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import { selectCurrentAlbum, setCurrentAlbum } from '../../store/reducers/AlbumSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/redux';
import { setCurrentPhoto } from '../../store/reducers/PhotoSlice';

interface IUserMainPhotoProps
{
    userState: any;
    sx?: object;
    isDropActive:boolean;
}


const UserMainPhoto:FC<IUserMainPhotoProps> = ({userState,isDropActive,...other}) => 
{
  
  const [createPhoto, photoStatus] = useCreatePhotoMutation();
  const [createAlbum, albumStatus] = useCreateAlbumMutation();
  const dispatch = useDispatch();


  useEffect(() => 
  {
      if (photoStatus.isSuccess) 
      {
        toast.success('Фото успешно добавлено!');
      }

      if (photoStatus.isError) 
      {
        if (Array.isArray((photoStatus.error as any).data.error)) 
        {
          (photoStatus.error as any).data.error.forEach((el: any) =>toast.error(el.message, {position: 'top-right',}));
        } 
        else 
        {
          toast.error((photoStatus.error as any).data.message, {position: 'top-right',});
        }
      }
  }, [photoStatus.isLoading]);

  useEffect(() => 
  {
      if (albumStatus.isError) 
      {
        if (Array.isArray((photoStatus.error as any).data.error)) 
        {
          (albumStatus.error as any).data.error.forEach((el: any) =>toast.error(el.message, {position: 'top-right',}));
        } 
        else 
        {
          toast.error((albumStatus.error as any).data.message, {position: 'top-right',});
        }
      }
  }, [albumStatus.isLoading]);


  const addMainPhoto = async (file:File) =>
  {
    const albumData = await createAlbum({name:"Фото профиля",userId:userState.id}).unwrap();
    dispatch(setCurrentAlbum({...albumData})); 

    if (albumData) 
    {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('albumId',albumData[0].id);
      formData.append('description', '');
      formData.append('name',file.name);
      const photoData = await createPhoto(formData).unwrap();
      dispatch(setCurrentPhoto({...photoData})); 
    }   
  }

  return (
    <Card {...other}>
      {userState?.mainPhoto ?
        <Image src={process.env.REACT_APP_API_URL + userState?.mainPhoto} 
        bgColor="whitesmoke"
        height="100%"
        width="100%"
        />
        :
        <DragZone isDropActive={isDropActive} extensions={['png','jpeg','jpg']} setFile={addMainPhoto}>
          <LoadingButton sx={{height:"50vh",width:"100%",color:"red"}}>
              <Add/>
          </LoadingButton>
        </DragZone>
      }
    </Card>
  );
}

export default UserMainPhoto;