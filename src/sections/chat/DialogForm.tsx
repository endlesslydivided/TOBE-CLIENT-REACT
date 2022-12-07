//@ts-nocheck
import { styled } from  '@mui/material/styles';
import { Avatar, Card, IconButton, ImageList, ImageListItem, ImageListItemBar, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Add, CheckBox, Close, DateRange, FileCopy, InsertDriveFile, Language, LocationCity, Send, TextFormat, TextSnippet, TitleOutlined, Wc } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import { DateTimePicker, LoadingButton } from '@mui/lab';
import AvatarList from '../../components/avatarList';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import FullScreenLoader from '../../components/FullScreenLoader';
import { FriendsListItem, RequestListItem, UsersListItem } from '../../components/avatarList/AvatarList';
import { useAppSelector } from '../../hooks/redux';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/search/Search';
import SearchIcon from '@mui/icons-material/Search';
import { object, ObjectPair, string, TypeOf } from 'zod';
import NewsList, { FeedListItem } from '../../components/newsList/NewsList';
import { useCreateDialogMutation } from '../../services/DialogsService';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FileButton from '../../components/fileButton/FileButton';
import DragZone from '../../components/dragZone';
import { Stack } from '@mui/system';
import nextId from 'react-id-generator';
import AudioPlayer from 'material-ui-audio-player';
import FormInput from '../../components/FormInput';
import { useSendMessageMutation } from '../../services/ChatApiSlice';


interface IDialogForm
{
    isDropActive: boolean;
    toUserId: number;
    dialogId: number;
    dialogUser: any;
}


const DialogForm:FC<IDialogForm>= ({isDropActive,toUserId,dialogId,dialogUser,...other}) => 
{
  const userState :any = useAppSelector(state => state.auth.user);

  const [messageText,setMessageText] = useState('');

  const [createMessage,{ isLoading, isSuccess, error, isError }]  = useSendMessageMutation();

  useEffect(() => 
  {
      if (isError) 
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
  }, [isLoading]);

  const handleSendMessage = async () =>
  {
    if(messageText.length > 1000)
    {
      toast.error('Длина сообщения должна быть не более 1000 символов', {position: 'top-right',});
      return;
    }

    const message = await createMessage(
        {
            fromUserId:userState.id,
            toUserId:dialogUser.id,
            dto:
            {
                text: messageText,
                userId: userState.id,
                dialogId
            }
        }
    )
    setMessageText('');

  };


  return (
        <Box component='form' sx={{ p: 1}} autoComplete='off' width='100%'>
          <Grid container spacing={1} rowSpacing={0}>
            <Grid item sx={{display:"flex",justifyContent:"center"}} xs={12} md={10} spacing={1} >
            {
              isDropActive?
              <DragZone isDropActive={isDropActive} setFile={addAttachments}>
                <Add/>
              </DragZone>
              :
              <>
                <Grid item xs={12} >
                  <TextField disabled={!dialogUser} size="small" type="text" fullWidth name="content" value={messageText} 
                  onChange={(e) => setMessageText(e.target.value)} label={`Написать сообщение (${messageText.length}/1000)`}	multiline maxRows={10}/>         
                </Grid>         
              </>
            }
            </Grid>         
            <Grid item xs={12}  md={2}>
              <LoadingButton variant='contained' 
              onClick={() => handleSendMessage()}
              disabled={messageText.length === 0} 
              sx={{widht:"100%",height:"100%"}} fullWidth disableElevation loading={isLoading}  >
                <Send sx={{color:"white"}}/>
              </LoadingButton>
            </Grid>
          </Grid>

		</Box>
  );
}



export default DialogForm;