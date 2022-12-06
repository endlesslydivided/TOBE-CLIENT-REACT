//@ts-nocheck
import { ArrowLeft, Close, Feed, People, PeopleOutline, Send } from '@mui/icons-material';
import { Box, Button, CardContent, Container, Divider, Fab, Grid, IconButton, Paper, TextField } from '@mui/material';
import WidgetSummary from '../../components/summaryWidget/SummaryWidget';
import SummarySection from '../../sections/AdminSections/summary/SummarySection';
import { Card, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import NavigateBackButton from '../../components/ui/NavigateBackButton';
import { useGetPagedUsersQuery } from '../../services/UsersApiSlice';
import { toast } from 'react-toastify';
import AdminUsersTable from '../../components/adminUsersTable/AdminUsersTable';
import { LoadingButton } from '@mui/lab';
import FullScreenLoader from '../../components/FullScreenLoader';
import { useSendEmailMutation } from '../../services/AdminApiSlice';
import { useDeletePostsMutation, useGetAllPostsQuery, useLazyGetOnePostQuery } from '../../services/PostsService';
import AdminPostsTable from '../../components/adminPostsTable/AdminPostsTable';
import PostItem from '../../components/postItem/PostItem';

const initialFilters=
{
    search: '',
    page: 0,
    limit: 10,
    orderBy:'createdAt',
    orderDirection: 'DESC',
}

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

const UsersAdminPage = () => 
{

  const [filters,setFilters] = useState(initialFilters)
  const [changePostsList,setChangePostsList] = useState({rows:[]})
  const [mailContent,setMailContent] = useState({message:'',title:''});

  const [selectedPostId,setSelectedPostId] = useState(0);
  const [selectedPost,setSelectedPost] = useState(null);

  const [deletePosts,deletePostsResult]  = useDeletePostsMutation();
  const [trigger,resultGetOnePost] = useLazyGetOnePostQuery();
  const [sendEmail,sendEmailResult]  = useSendEmailMutation();

  const resultGetAllPosts = useGetAllPostsQuery({filters: {...filters,page:filters.page + 1}},{refetchOnMountOrArgChange:true});

  const navigate = useNavigate();

  useEffect(() => checkQuery(resultGetAllPosts.error),[resultGetAllPosts.isLoading]);
  useEffect(() => checkQuery(deletePostsResult.error),[deletePostsResult.isLoading]);
  useEffect(() => checkQuery(sendEmailResult.error),[sendEmailResult.isLoading]);

  useEffect(() => {resultGetOnePost.isSuccess && setSelectedPost(resultGetOnePost)}, [resultGetOnePost.isFetching]);
  useEffect(() => {selectedPostId && trigger(selectedPostId)},[selectedPostId]);

  useEffect(() => {},[changePostsList,resultGetOnePost]);


  const handleDeletePosts= async () =>
  {
    if(mailContent.message.length > 1000)
    {
      toast.error('Длина сообщения должна быть не более 1000 символов', {position: 'top-right',});
      return;
    }
    if(mailContent.title.length === 0)
    {
      toast.error('Введите заголовок сообщения', {position: 'top-right',});
      return;
    }
    if(changePostsList.rows.length === 0)
    {
      toast.error('Выберите посты удаления', {position: 'top-right',});
      return;
    }
    var search = new URLSearchParams(changePostsList.rows.map(s=>['ids',s.id]))

    const resultDelete = await deletePosts(search)
    if(resultDelete?.data)
    {
      const emails = Array.from(new Set(changePostsList.rows.map(x => x.user.email)));
      const resultSendEmail = await sendEmail({...mailContent, emails});
      if(resultSendEmail?.data)
      {
        toast.success(`Удалено ${resultDelete?.data} постов.Сообщение об удалении отправлено ${resultSendEmail.data} из ${emails.length} пользователям `, {position: 'top-right',});
        setMailContent(previous => ({message:'',title:''}))
        setChangePostsList({rows:[]});
        setFilters((previous) => ({...initialFilters}))
      }
    }
  };
  
  if(resultGetAllPosts.isLoading) return <FullScreenLoader/>
 
  return (       
      <Grid container spacing={1} sx={{height:'100%'}}>
          <Grid item xs={12} md={12} lg={12}  >

              <Box sx={{p: 0,bgcolor: 'grey.300',borderRadius:"15px"}}>
              <Stack direction="row" >
                <IconButton sx={{p: 2,m:1}}  size='medium' onClick={() => navigate(-1)}>
                  <ArrowLeft/>           
                </IconButton>

                <Typography sx={{m: 3}}>
                  Новостные посты
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6} >
            <AdminPostsTable 
            setFilters={setFilters} 
            setSelectedPostId={setSelectedPostId}
            filters={filters} 
            posts={resultGetAllPosts?.data} 
            changePostsList={changePostsList} 
            setChangePostsList={setChangePostsList} />
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            {
              resultGetOnePost?.data ?
              resultGetOnePost.isFetching ?
              <Box sx={{display:'flex',boxShadow:'0px 0px 20px rgb(0,0,0,0.1)',justifyContent:'center',alignItems:'center',p: 0,height:'100%',width:'100%',bgcolor: 'grey.200',borderRadius:"15px"}}>
                <FullScreenLoader/>
              </Box>
              :
              <PostItem post={resultGetOnePost?.data}/>
              :
              <Box sx={{display:'flex',boxShadow:'0px 0px 20px rgb(0,0,0,0.1)',justifyContent:'center',alignItems:'center',p: 0,height:'100%',width:'100%',bgcolor: 'grey.200',borderRadius:"15px"}}>
                Выберите пост
              </Box>
            }
            
          </Grid>
          <Grid item xs={12} md={12} lg={12} >
          <Card sx={{p:3}}>
            <CardContent component="form" autoComplete="false">
              <Grid container spacing={1}>
                <Grid item xs={11} md={11} lg={11}>
                  <Stack direction="column" fullWidth spacing={1}>

                    <TextField size="small" type="text" fullWidth name="content" value={mailContent.title} 
                    onChange={(e) => setMailContent(previous => ({...previous,title:e.target.value}))} 
                    label={`Заголовок сообщения`}	multiline maxRows={10}/>

                    <Divider direction="horizontal"/>

                    <TextField size="small" type="text" sx={{height:"100%"}} fullWidth name="content" value={mailContent.message} 
                    onChange={(e) => setMailContent(previous => ({...previous,message:e.target.value}))}
                    label={`Cообщение (${mailContent?.message?.length}/1000)`}	multiline maxRows={10}/>  

                  </Stack>
                </Grid>
                <Grid item xs={1} md={1} lg={1}>
                <LoadingButton variant='contained' color="error"
                onClick={() => handleDeletePosts()}
                disabled={mailContent?.message?.length === 0 || mailContent?.title?.length === 0} 
                sx={{widht:"100%",height:"100%"}} fullWidth disableElevation loading={sendEmailResult.isLoading}  >
                  <Close sx={{color:"white"}}/>
                </LoadingButton>
                </Grid>
                         
            </Grid>
            </CardContent>
          </Card>
          </Grid>
      </Grid>
  );
};

export default UsersAdminPage;

