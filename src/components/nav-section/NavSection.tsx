import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItemText } from '@mui/material';
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { FC } from 'react';

interface INavSectionProps
{
  data: Array<any>,
  user: any
}

interface INavItemProps
{
  item: object,
  mainPath:string
}

const NavSection: FC<INavSectionProps> = ({ data = [],user, ...other }) =>{
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        
      {data.map((manager:any) => 
		  	user.roles.some((role:any) => role.name === manager.role) &&
			  manager.routes.map((item:any, position:number) => 
          <NavItem key={item.title} mainPath ={manager.mainPath} item={item} /> )
        )
      }
      
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

const  NavItem:FC<INavItemProps> = ({ item,mainPath }) => 
{
  const { route, Icon, text,index }:any = item;

  return (
    <StyledNavItem component={RouterLink} to={mainPath + (route)}  
    sx={{'&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{Icon && <Icon/>}</StyledNavItemIcon>

      <ListItemText disableTypography primary={text} />

      {/* {info && info} */}
    </StyledNavItem>
  );
}

export default NavSection;
