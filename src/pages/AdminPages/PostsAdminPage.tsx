import { Feed, People, PeopleOutline } from '@mui/icons-material';
import { Box, Button, CardContent, Container, Grid, IconButton } from '@mui/material';
import WidgetSummary from '../../components/summaryWidget/SummaryWidget';
import SummarySection from '../../sections/AdminSections/summary/SummarySection';
import { Card, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import NavigateBackButton from '../../components/ui/NavigateBackButton';

const PostsAdminPage = () => {


  return (
    <Container maxWidth="xl" sx={{height:'100%'}}>
      <NavigateBackButton/>
      <Grid container spacing={3} sx={{height:'100%'}}>
          <Grid id="back-to-top-anchor" item xs={12} md={3} lg={3}>
            <Stack direction="row" sx={{height:'100%'}}>
             
            </Stack>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <SummarySection/>

          </Grid>
      </Grid>
    </Container>
  );
};

export default PostsAdminPage;

