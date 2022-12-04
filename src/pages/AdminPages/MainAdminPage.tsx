import { Feed, People, PeopleOutline } from '@mui/icons-material';
import { Box, CardContent, Container, Grid } from '@mui/material';
import WidgetSummary from '../../components/summaryWidget/SummaryWidget';
import SummarySection from '../../sections/AdminSections/summary/SummarySection';
import { Card, Typography } from '@mui/material';
import { Stack } from '@mui/system';

const MainAdminPage = () => {


  return (
    <Container maxWidth="xl" sx={{height:'100%'}}>
      <Grid container spacing={3} sx={{height:'100%'}}>
          <Grid id="back-to-top-anchor" item xs={12} md={3} lg={3}>
            <Stack direction="column" sx={{height:'100%'}}>
              <WidgetSummary title="Пользователи" sx={{bgcolor:'grey.400',mb:3,height:'100%'}} color="error" icon={<People/>} />
              <WidgetSummary title="Посты" sx={{bgcolor:'grey.400',mb:3,height:'100%'}} color="error" icon={<Feed/>} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <SummarySection/>

          </Grid>
      </Grid>
    </Container>
  );
};

export default MainAdminPage;

