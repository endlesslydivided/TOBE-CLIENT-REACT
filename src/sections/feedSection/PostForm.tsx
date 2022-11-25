
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


//     const addMainPhoto = async (file:File| null) =>
//     {
//     if(!file)
//     {
//       toast.error("Выберите изображение", {position: 'top-right',}); 
//       return; 
//     }
//     const albumData = await createAlbum({name:"Фото профиля",userId:userState.id}).unwrap();
//     dispatch(setCurrentAlbum({...albumData})); 

//     if (albumData) 
//     {
//       const formData = new FormData();
//       let blob;
//       const fr = new FileReader()
//       fr.readAsArrayBuffer(file)
//       fr.onload = async () => 
//       {
//           blob = new Blob([fr.result],{type:file.type});

//           // const url = URL.createObjectURL(blob, {type: "image/png"});
//           // const a = document.createElement("a")
//           // a.href = url 
//           // a.download = "image"
//           // a.click()

//           formData.append('file', blob,file.name);
//           formData.append('albumId',albumData[0].id);
//           formData.append('description', '');
          
//           const photoData = await createPhoto(formData).unwrap();
//           dispatch(setCurrentPhoto({...photoData})); 
//           const userData = await updateUser({id:userState.id, dto: {mainPhoto: photoData.id}}).unwrap();
//           dispatch(setCredentials({...userState,mainPhoto: userData.mainPhoto}))
//       }  
//     }   
//   }

  return (
    <Card {...other}>
      <FormProvider {...methods}>
        <Box component='form'  onSubmit={handleSubmit(onSubmitHandler)}  noValidate  autoComplete='off' maxWidth='27rem'  width='100%'>
					<Grid container>

					{
						isDropActive?
						<>
							<Grid item xs={12} md={12}>
								<TextField
									id="content-field"
									label="Контент"
									multiline
									ref={TFRef}
									maxRows={10}
									value={}
								/>
							</Grid>
							<Grid item xs={1} md={1}>
								<FileButton sx={{height:"50vh",width:"100%",color:"red"}} setFile={}>
									<Add/>
								</FileButton>
							</Grid>
						</>
						:
						<DragZone isDropActive={isDropActive} setFile={}>
							<Add/>
						</DragZone>
					}
					</Grid>
				</Box>
			</FormProvider>
    </Card>
  );
}



export default PostForm;