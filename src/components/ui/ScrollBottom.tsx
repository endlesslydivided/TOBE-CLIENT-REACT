import { Box, Fade, useScrollTrigger } from "@mui/material";
import { FC } from "react";

interface IScrollBottomProps
{
    children: React.ReactElement;
}

const  ScrollBottom: FC<IScrollBottomProps> = (props) => {
    const { children } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: undefined,
      
      threshold: 10,
    });
  
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const anchor = (
        (event.target as HTMLDivElement).ownerDocument || document
      ).querySelector('#back-to-bottom-anchor');
  
      if (anchor) {
        anchor.scrollIntoView({
          block: 'center',
        });
      }

    };
  
    return (
      <Fade in={trigger} >
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: 'fixed', bottom: 80, right: 40 }}
        >
          {children}
        </Box>
      </Fade>
    );
  }

export default ScrollBottom;