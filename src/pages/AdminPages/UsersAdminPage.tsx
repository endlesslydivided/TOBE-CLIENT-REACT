//@ts-nocheck
import { ArrowLeft, Feed, People, PeopleOutline, Send } from '@mui/icons-material';
import { Box, Button, CardContent, Container, Divider, Fab, Grid, IconButton, TextField } from '@mui/material';
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

const initialFilters=
{
    search: '',
    page: 0,
    limit: 10,
    orderBy:'createdAt',
    orderDirection: 'ASC',
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
  const [changeUsersList,setChangeUsersList] = useState({rows:[]})
  const [mailContent,setMailContent] = useState({message:'',title:''});
  const resultGetUsers  = useGetPagedUsersQuery({filters: {...filters,page:filters.page + 1}},{refetchOnMountOrArgChange:true});
  const [sendEmail,sendEmailResult]  = useSendEmailMutation();

  const navigate = useNavigate();
  useEffect(() => checkQuery(resultGetUsers.error),[resultGetUsers.isLoading]);
  useEffect(() => checkQuery(sendEmailResult.error),[sendEmailResult.isLoading]);

  useEffect(() => {},[changeUsersList]);
  if(resultGetUsers.isLoading)
  {
    return <FullScreenLoader/>
  }
  
  const handleSendMessage = async () =>
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
    if(changeUsersList.rows.length === 0)
    {
      toast.error('Выберите пользователей для отправки сообщений', {position: 'top-right',});
      return;
    }
    const {data} = await sendEmail(
        {
          ...mailContent,
            emails: changeUsersList.rows.map(x => x.email)
        }
    )
    if(data)
    {
      toast.success(`Сообщение отправлено ${data} из ${changeUsersList.rows.length} пользователям `, {position: 'top-right',});
      setMailContent(previous => ({message:'',title:''}))
      setChangeUsersList({rows:[]});
    }

  };
  
 
  return (       
      <Grid container spacing={1} sx={{height:'100%'}}>
          <Grid item xs={12} md={12} lg={12}  >

              <Box sx={{p: 0,bgcolor: 'grey.300',borderRadius:"15px"}}>
              <Stack direction="row" >
                <IconButton sx={{p: 2,m:1}}  size='medium' onClick={() => navigate(-1)}>
                  <ArrowLeft/>           
                </IconButton>

                <Typography sx={{m: 3}}>
                  Пользователи
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6} >
            <AdminUsersTable setFilters={setFilters} filters={filters} changeUsersList={changeUsersList} setChangeUsersList={setChangeUsersList} users={resultGetUsers?.data}/>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <AdminUsersTable changeUsersList={changeUsersList} setChangeUsersList={setChangeUsersList} users={changeUsersList}/>
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
                <LoadingButton variant='contained' 
                onClick={() => handleSendMessage()}
                disabled={mailContent?.message?.length === 0 || mailContent?.title?.length === 0} 
                sx={{widht:"100%",height:"100%"}} fullWidth disableElevation loading={sendEmailResult.isLoading}  >
                  <Send sx={{color:"white"}}/>
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

