import { Article, Message, People, Photo } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React from 'react'
import FullScreenLoader from '../../../components/FullScreenLoader'
import WidgetSummary from '../../../components/summaryWidget/SummaryWidget'
import { useGetMessagesStatsQuery, useGetPhotosStatsQuery, useGetPostsStatsQuery, useGetUsersStatsQuery } from '../../../services/AdminApiSlice'

const SummarySection = () => {

  const {data:messages,isLoading:isLoadinMessages} = useGetMessagesStatsQuery(null);
  const {data:posts,isLoading:isLoadingPosts} = useGetPostsStatsQuery(null);
  const {data:users,isLoading:isLoadingUsers} = useGetUsersStatsQuery(null);
  const {data:photos,isLoading:isLoadingPhotos} = useGetPhotosStatsQuery(null);

  if(isLoadinMessages ||
    isLoadingPosts ||
    isLoadingUsers ||
    isLoadingPhotos )
  {
    return <FullScreenLoader/>
  }

  return (
    <Grid container sx={{height:'50%'}} spacing={3}>
      <Grid  item xs={12} sm={6} md={3}>
        <WidgetSummary sx={{height:'100%'}} title="Постов" total={posts} icon={<Article/>}  />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <WidgetSummary sx={{height:'100%'}} title="Пользователей" total={users} color="info" icon={<People/>} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <WidgetSummary sx={{height:'100%'}} title="Сообщений" total={messages} color="warning" icon={<Message/>} />
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <WidgetSummary sx={{height:'100%'}} title="Фотографий" total={photos} color="error" icon={<Photo/>} />
      </Grid>
    </Grid>
  )
}

export default SummarySection