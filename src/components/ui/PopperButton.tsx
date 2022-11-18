import * as React from 'react';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';

type IPopperButtonProps = {
  text: string | undefined;
  color?: "inherit" | "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning" | undefined;
  icon: React.ReactElement;
  onClick: Function
};

const PopperButton: React.FC<IPopperButtonProps> = ({text, icon,color = "default",onClick }) => {

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  
  return (
    <div>
      <IconButton 
      onClick={(e) => onClick(e)}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose} color={color}>
        {icon}
      </IconButton>

      <Popover  
      id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box sx={{p: 1, bgcolor: 'background.paper' }}>
          {text}
        </Box>
      </Popover>
    </div>
  );
}

export default PopperButton;