//@ts-nocheck
import { useTheme, styled } from '@mui/material/styles';
import { Card, CardHeader } from '@mui/material';
import { FC, useEffect } from 'react';
import { Add } from '@mui/icons-material';
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

interface IProfileMainPhotoProps
{
    userState: any;
    sx?: object;
    isDropActive:boolean;
}


const ProfileMainPhoto:FC<IProfileMainPhotoProps> = ({userState,isDropActive,...other}) => 
{
  
  const [createPhoto, photoStatus] = useCreatePhotoMutation();
  const [createAlbum, albumStatus] = useCreateAlbumMutation();
  const [updateUser, userStatus] = useUpdateUserMutation();

  const dispatch = useDispatch();

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


  useEffect(() => checkStatus(photoStatus,`Фото успешно добавлено!`),[photoStatus.isLoading]);
  useEffect(() => checkStatus(albumStatus,`Альбом успешно создан!`),[albumStatus.isLoading]);
  useEffect(() => checkStatus(userStatus,`Пользователь успешно изменён!`),[userStatus.isLoading]);


  const addMainPhoto = async (file:File| null) =>
  {
    if(!file)
    {
      toast.error("Выберите изображение", {position: 'top-right',}); 
      return; 
    }
    const formData = new FormData();
    let blob;
    const fr = new FileReader()
    fr.readAsArrayBuffer(file)
    fr.onload = async () => 
    {
        blob = new Blob([fr.result],{type:file.type});

        // const url = URL.createObjectURL(blob, {type: "image/png"});
        // const a = document.createElement("a")
        // a.href = url 
        // a.download = "image"
        // a.click()

        formData.append('file', blob,file.name);
        formData.append('albumId',userState.albums.find(x => x.name === 'Фото профиля'));
        formData.append('description', '');
        
        const photoData = await createPhoto(formData).unwrap();
        dispatch(setCurrentPhoto({...photoData})); 
        await updateUser({id:userState.id, dto: {mainPhoto: photoData.id}}).unwrap();
    }     
  }

  

  return (
    <Card sx={{height:"200px"}} {...other}>
      {
        userState?.photo ?
        <Image src={process.env.REACT_APP_API_URL + userState?.photo.path} 
        bgColor="whitesmoke" fit="cover"
        />
        :
        <DragZone isDropActive={isDropActive} extensions={['png','jpeg','jpg']} setFile={addMainPhoto}>
          <FileButton sx={{height:"50vh",width:"100%",color:"red"}} setFile={addMainPhoto}>
            <Add/>
          </FileButton>
        </DragZone>
      }
    </Card>
  );
}

export default ProfileMainPhoto;