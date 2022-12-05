import { Article, Message, People, Photo } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React from 'react'
import AdminUsersTable from '../../../components/adminUsersTable/AdminUsersTable'
import FullScreenLoader from '../../../components/FullScreenLoader'
import WidgetSummary from '../../../components/summaryWidget/SummaryWidget'
import { useGetMessagesStatsQuery, useGetPhotosStatsQuery, useGetPostsStatsQuery, useGetUsersStatsQuery } from '../../../services/AdminApiSlice'

const SummarySection = () => {

  const resultGetUsers = useGetUsersStatsQuery(null);

  if(resultGetUsers.isLoading)
  {
    return <FullScreenLoader/>
  }

  return (
    <Grid container sx={{height:'50%'}} spacing={3}>
        <Grid id="back-to-top-anchor" item xs={12} md={6} lg={6}>
            <AdminUsersTable/>
        </Grid>
        <Grid id="back-to-top-anchor" item xs={12} md={6} lg={6}>
            <AdminUsersTable/>
        </Grid>
    </Grid>
  )
}

export default SummarySection