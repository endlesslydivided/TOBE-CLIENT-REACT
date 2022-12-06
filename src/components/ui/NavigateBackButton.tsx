//@ts-nocheck
import { ArrowLeft } from '@mui/icons-material';
import { Box, Fab } from '@mui/material';
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';

const NavigateBackButton = () => {

    const navigateBack = useRef();
    const navigate = useNavigate();
  return (
    <Box
    ref={navigateBack}
    onMouseOver={()=> {navigateBack!.current!.style!.opacity = 1}}
    onMouseOut={()=> {navigateBack!.current!.style!.opacity = 0.3}}

    onClick={() => navigate(-1)}
    sx={{ position: 'fixed', top: 80, left: 40,opacity:0.3}}
  >
    <Fab size="large" color="info" aria-label="scroll back to bottom">
      <ArrowLeft/>           
    </Fab>
</Box>
  )
}

export default NavigateBackButton