//@ts-nocheck

import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { bgBlur } from '../../../utils/cssStyles';
import { FC } from 'react';
import AccountPopover from './AccountPopover';
import { Menu } from '@mui/icons-material';
import { shadows } from '@mui/system';


const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 64;

export const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: 
  {
    width: `calc(100%)`,
  },
}));

 const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

interface IHeaderProps
{
  onOpenNav: React.MouseEventHandler,
}

const Header: FC<IHeaderProps>  = ({ onOpenNav}) =>{
  return (
    <StyledRoot  >
      <StyledToolbar sx={{backgroundColor:"grey.300",boxShadow:"0px 0px 15px rgb(0,0,0,0.3)" }}>
        <Box sx={{mt:1,mx:3, display: 'inline-flex',justifyContent:'center',color:'black' }}>
          <Typography variant="h3" gutterBottom>tobe</Typography>
          <Typography variant="h6" gutterBottom>admin</Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{xs: 0.5,sm: 1}}>
          {/* <NotificationsPopover /> */}
          <AccountPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}

export default Header;