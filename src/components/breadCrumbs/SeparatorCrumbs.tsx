import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface SeparatorCrumbsProps
{
  breadcrumbs: any
}

const SeparatorCrumbs: React.FC<SeparatorCrumbsProps> = ({breadcrumbs}) => {

    return (
      <Stack spacing={2}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >

          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
    );
  }

  export default SeparatorCrumbs