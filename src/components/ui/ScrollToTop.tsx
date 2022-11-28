import { Box, Fade, useScrollTrigger } from "@mui/material";
import { FC } from "react";

interface IScrollToTopProps
{
    children: React.ReactElement;
}

const  ScrollTop: FC<IScrollToTopProps> = (props) => {
    const { children } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100,
    });
  
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      const anchor = (
        (event.target as HTMLDivElement).ownerDocument || document
      ).querySelector('#back-to-top-anchor');
  
      if (anchor) {
        anchor.scrollIntoView({
          block: 'center',
        });
      }
    };
  
    return (
      <Fade in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: 'fixed', bottom: 40, right: 50 }}
        >
          {children}
        </Box>
      </Fade>
    );
  }

export default ScrollTop;