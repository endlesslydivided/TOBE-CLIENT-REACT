//@ts-nocheck
import { styled } from  '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, FormControlLabel, FormGroup, List, ListItemText, Switch, Tab, Tabs, TextField } from '@mui/material';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Add, DateRange, Language, LocationCity, Wc } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import { DateTimePicker } from '@mui/lab';
import AvatarList from '../../components/avatarList';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useGetPagedAvoidedRequestsByUserQuery, useGetPagedFeedByUserQuery, useGetPagedFriendsByUserQuery, useGetPagedFriendsRequestsByUserQuery, useGetPagedPostsByUserQuery, useGetPagedUsersQuery } from '../../services/UsersApiSlice';
import FullScreenLoader from '../../components/FullScreenLoader';
import { FriendsListItem, RequestListItem, UsersListItem } from '../../components/avatarList/AvatarList';
import { useAppSelector } from '../../hooks/redux';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/search/Search';
import SearchIcon from '@mui/icons-material/Search';
import { object, ObjectPair, string, TypeOf } from 'zod';
import NewsList, { FeedListItem } from '../../components/newsList/NewsList';
import { useCreatePostMutation } from '../../services/PostsService';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FileButton from '../../components/fileButton/FileButton';
import DragZone from '../../components/dragZone';

interface IPostForm
{
    isDropActive: boolean;
}

const postSchema =object({
    title: string().min(0).max(100,'Длина заголовка - не более 100 символов'),
    content: string().min(0).max(1000,'Длина текста - не более 10000 символов'),
    description: string().min(0).max(255,'Длина описание - не более 255 символов')
});

export type PostInput = TypeOf<typeof postSchema>;

const PostForm:FC<IPostForm>= ({isDropActive,...other}) => {
  
    const userState :any = useAppSelector(state => state.auth.user);

    const methods = useForm<PostInput>({resolver: zodResolver(postSchema),});
    const {reset,handleSubmit,formState: { isSubmitSuccessful }} = methods;
    const [files,setFiles] = useState();

    const TFRef = useRef(null);

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

    useEffect(() =>{{isSubmitSuccessful && isSuccess &&  reset()}}, [isSubmitSuccessful,isSuccess]);
    const onSubmitHandler: SubmitHandler<PostInput> = (values) => 
    {     
        createPost(values);
    };


    const addAttachments = async (attachments:File[]| File) =>
    {
      if(files.length + attachments.length > 10)
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
              setFiles([...files,{data:blob,name:file.name}]);
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
            setFiles([...files,{data:blob,name:attachments.name}]);
        }  
      }
       
  }

  return (
    <Card {...other} sx={{ p: 2}}>
      <FormProvider {...methods}>
        <CardContent component='form' sx={{ p: 1}}  onSubmit={handleSubmit(onSubmitHandler)}  noValidate  autoComplete='off' width='100%'>
          <Grid container sx={{display:"flex",justifyContent:"center"}} spacing={1} >
					{
						isDropActive?
            <DragZone isDropActive={isDropActive} setFiles={addAttachments}>
							<Add/>
						</DragZone>
            :
						<>
                <Grid item xs={6} row>
                  <TextField id="title-field" name='title' size="small"  sx={{width:"100%"}}  label="Заголовок"/>
                </Grid>

                <Grid item xs={6} row>
                  <TextField id="title-field" name='description' size="small"  sx={{width:"100%"}}  label="Описание"/>
                </Grid>

                <Grid item xs={12} row>
                  <TextField id="content-field" name='content' size="small"  sx={{width:"100%"}} 	label="Контент"	multiline	ref={TFRef} maxRows={10}/>
                </Grid>


                <Grid item xs={12} row>
                  <FileButton sx={{color:"red"}} setFile={addAttachments}>
                    <Add/>
                    <Typography variant="body2" color="text.secondary" sx={{py:1}}>Прикрепление</Typography>
                  </FileButton>
                </Grid>
						</>
					}
          </Grid>
				</CardContent>
			</FormProvider>
    </Card>
  );
}



export default PostForm;