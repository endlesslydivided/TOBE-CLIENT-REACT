import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, InputAdornment, List, ListItemText } from '@mui/material';
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { FC } from 'react';
import { LockOutlined } from '@mui/icons-material';

interface INavSectionProps
{
  data: Array<any>,
  user: any
}

interface INavItemProps
{
  item: any,
  mainPath:string
}

const NavSection: FC<INavSectionProps> = ({ data = [],user, ...other }) =>{
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        
      {data.map((manager:any) => 
		  	user.roles.some((role:any) => role.name === manager.role) &&
			  manager.routes.map((item:any, position:number) => 
          <NavItem key={item.title}  mainPath ={manager.mainPath} item={item} /> )
        )
      }
      
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

const  NavItem:FC<INavItemProps> = ({ item,mainPath }) => 
{
  const { route, Icon, text,key }:any = item;

  return (
    <StyledNavItem disabled={item?.disabled}  key={key} component={RouterLink} to={mainPath + (route)}  
    sx={{'&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{Icon && <Icon/>}</StyledNavItemIcon>

      <ListItemText disableTypography primary={text} />
      {
        item?.disabled && <LockOutlined sx={{m:1}}/>
      }
    </StyledNavItem>
  );
}

export default NavSection;
