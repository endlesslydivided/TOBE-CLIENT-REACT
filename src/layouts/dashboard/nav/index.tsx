//@ts-nocheck
import PropTypes from 'prop-types';
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';

import useResponsive from '../../../hooks/useResponsive';

import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';

import navConfig from './config';
import { useAppSelector } from '../../../hooks/redux';


const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

interface INavProps
{
  openNav: boolean,
  onCloseNav: funciton,
}

const Nav: FC<INavProps> = ({ openNav, onCloseNav }) =>{
  
  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'lg');
	const user :any = useAppSelector(state => state.auth.user);

  useEffect(() => { 
    if (openNav) 
    {
      onCloseNav(); 
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar sx={{height: 1,'& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' }}}>
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            
            <Avatar src={user?.photo?.path && process.env.REACT_APP_API_URL + user?.photo?.path}  alt="photoURL" />
            
           

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {`${user.firstName} ${user.lastName}`}
              </Typography>

             
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} user={user} />

    </Scrollbar>
  );

  return (
    <Box component="nav" sx={{flexShrink: { lg: 0 },width: { lg: NAV_WIDTH }}}>
      {isDesktop ? (
        <Drawer open variant="permanent" PaperProps={{sx: { width: NAV_WIDTH,bgcolor: 'background.default', borderRightStyle: 'dashed'}}}>
          {renderContent}
        </Drawer>
      ) : 
      (
        <Drawer open={openNav} onClose={onCloseNav} ModalProps={{keepMounted: true,}}
          PaperProps={{sx: { width: NAV_WIDTH },}}>
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

export default  Nav;