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
import { useCreatePostMutation } from '../../services/PostsService';
import { Controller, FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FileButton from '../../components/fileButton/FileButton';
import DragZone from '../../components/dragZone';
import { Stack } from '@mui/system';
import nextId from 'react-id-generator';
import AudioPlayer from 'material-ui-audio-player';
import FormInput from '../../components/FormInput';
import PostFormImages from '../../components/postParts/imageList/PostFormImages';
import PostFormDocs from '../../components/postParts/docsList/PostFormDocs';
import PostFormAudios from '../../components/postParts/audioList/PostFormAudios';

interface IPostForm
{
    isDropActive: boolean;
}

const postSchema =object({
    title: string().max(100,'Длина заголовка - не более 100 символов').optional().default(''),
    content: string({required_error:"Введите текст содержимого поста"})
    .min(1,'Необходимо добавить текст')
    .max(1000,'Длина текста поста - не более 10000 символов'),
    description: string().max(255,'Длина описание - не более 255 символов').optional().default('')
});

export type PostInput = TypeOf<typeof postSchema>;

const PostForm:FC<IPostForm>= ({isDropActive,...other}) => 
{
  const userState :any = useAppSelector(state => state.auth.user);

  const methods = useForm({resolver: zodResolver(postSchema),});
  const {reset,handleSubmit,formState: { isSubmitSuccessful }} = methods;
  const [files,setFiles] = useState([]);

  const TDRef = useRef(null);

  const [createPost,{ isLoading, isSuccess, error, isError }]  = useCreatePostMutation();

  useEffect(() => 
  {
      if (isSuccess) 
      {
        toast.success('Пост создан успешно');
      }

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

  useEffect(() =>{
  {
    if(isSubmitSuccessful && isSuccess)
    {
      reset();
      setFiles([]);
    }
  }}, [isSubmitSuccessful,isSuccess]);

  const onSubmitHandler: SubmitHandler<PostInput> = async (values) => 
  {     
      const formData = new FormData();
      files.forEach((file) =>
      {
        formData.append('files[]', file.data,file.name);
      })

      formData.append('title', values.content);
      formData.append('description', values.description);
      formData.append('content', values.content);
      formData.append('userId', userState.id);
         
      await createPost(formData);
  };


  const addAttachments = async (attachments:File[]| File) =>
    {
      
      if((Array.isArray(attachments) && files.length + attachments.length > 10) || (files.length + 1> 10))
      {
        toast.error("Максимальное количество прикреплений - 10 файлов", {position: 'top-right',}); 
        return; 
      }
      if(!attachments)
      {
        toast.error("Выберите документы или изображения", {position: 'top-right',}); 
        return; 
      }

      if(Array.isArray(attachments))
      {
        attachments.forEach(file =>
          {
            const fr = new FileReader();
            fr.readAsArrayBuffer(file)
            fr.onload = async () => 
            {
              let blob = new Blob([fr.result],{type:file.type});
              setFiles([...files,{id: nextId(),data:blob,name:file.name}]);
            }  
          }
        )
      }
      else
      {
        const fr = new FileReader();
        fr.readAsArrayBuffer(attachments)
        fr.onload = async () => 
        {
            let blob = new Blob([fr.result],{type:attachments.type});
            setFiles([...files,{id: nextId(),data:blob,name:attachments.name}]);
        }  
      }
       
  }

  return (
    <Card {...other} sx={{ p: 2}}>
      <FormProvider {...methods}>
        <Box component='form' sx={{ p: 1}}  onSubmit={handleSubmit(onSubmitHandler)} autoComplete='off' width='100%'>
          <Grid container spacing={1} rowSpacing={0}>
            <Grid container item sx={{display:"flex",justifyContent:"center"}} xs={12} md={10} spacing={1} >
            {
              isDropActive?
              <DragZone isDropActive={isDropActive} setFile={addAttachments}>
                <Add/>
              </DragZone>
              :
              <>
                <Grid item xs={12} >
                  <FormInput size="small" type="text" name="content"	label="Расскажите что-нибудь..."	multiline	 maxRows={10}/>
               
                </Grid>
                <Grid item xs={12}   >
                  <Stack  direction="row"  justifyContent="left"  alignItems="center"  spacing={2}>
                    <FileButton sx={{color:"info.main"}} setFile={addAttachments}>
                      <TextSnippet/>
                    </FileButton>
                    <>
                      <Button  sx={{color:"info.main"}}  onClick={() => TDRef.current.hidden = !TDRef.current.hidden}>
                        <TitleOutlined/>
                      </Button>                   
                      <Card sx={{ p: 1, }} ref={TDRef} hidden={true}>
                          <Grid container sx={{display:"flex",justifyContent:"center"}} spacing={1} >

                            <Grid item xs={12} >
                              <FormInput size="small" type="text" name="title"   sx={{width:"100%"}}  label="Заголовок"/>
                            </Grid>

                            <Grid item xs={12} >
                              <FormInput size="small" type="text" name="description"   sx={{width:"100%"}}  label="Описание"/>
                            </Grid>
                          </Grid>
                        </Card>               
                    </>
                  </Stack>
                </Grid>
              </>
            }
            {
            files.length !== 0 && 
            <>
              <Grid item xs={12} >
                <PostFormImages setFiles={setFiles} files={files}/>
              </Grid>
              <Grid item xs={12} >
               <PostFormDocs setFiles={setFiles} files={files}/>
              </Grid>
              <Grid item xs={12} >
               <PostFormAudios setFiles={setFiles} files={files}/>
              </Grid>
            </>
            }
            </Grid>         
            <Grid item xs={12}  md={2}>
              <LoadingButton variant='contained' sx={{widht:"100%",height:"100%"}} fullWidth disableElevation   type='submit' loading={isLoading}  >
                <Send sx={{color:"white"}}/>
              </LoadingButton>
            </Grid>
          </Grid>

				</Box>
      </FormProvider>
    </Card>
  );
}



export default PostForm;