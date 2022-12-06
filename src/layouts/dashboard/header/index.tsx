//@ts-nocheck

import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import { bgBlur } from '../../../utils/cssStyles';
import { FC } from 'react';
import AccountPopover from './AccountPopover';
import { Menu } from '@mui/icons-material';


const NAV_WIDTH = 280;
const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 64;

export const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: 
  {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
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
    <StyledRoot >
      <StyledToolbar>
        <IconButton  onClick={onOpenNav} sx={{mr: 1,color: 'text.primary',display: { lg: 'none' }}}>
          <Menu/>
        </IconButton>

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