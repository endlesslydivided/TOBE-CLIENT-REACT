//@ts-nocheck
import { Box, CircularProgress, Container } from '@mui/material';
import { FC } from 'react';

interface FullScreenLoaderProps
{
  sx?:object
}
const FullScreenLoader: FC<FullScreenLoaderProps> = ({sx}) => {
  return (
    <Container sx={{ height: '95vh',...sx }}>
      <Box display='flex' alignItems='center' justifyContent='center'sx={{ height: '100%' }}>
        <CircularProgress  />
      </Box>
    </Container>
  );
};

export default FullScreenLoader;

