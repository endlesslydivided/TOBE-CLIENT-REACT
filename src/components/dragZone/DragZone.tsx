//@ts-nocheck
import { FC, forwardRef, useCallback, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
import {useDropzone} from 'react-dropzone';
import { Add } from '@mui/icons-material';

// interface IDragZoneProps
// {
//   extensions: string[],
//   setFile: Function,
//   innerText?: string,
//   children?: React.ReactNode;
// }

const DragZone= ({children,extensions,maxFiles,isDropActive,isMultiple,setFile,innerText = "Put your files here!",...other}) => 
{
    const onDrop = useCallback( (acceptedFiles:any) => {
        setFile(acceptedFiles[0]);
    }, [])
    const onDropMultiple = useCallback((acceptedFiles:any) => 
    {
      setFile(acceptedFiles);
    }, [])
    const {getRootProps, getInputProps} = useDropzone({onDrop: (isMultiple ? onDropMultiple : onDrop)})

    if(isDropActive)
    {
      return (
        <Box {...getRootProps()} sx={{height:"50vh",width:"100%",alignItems:"center",display:"flex",flexDirection:"column-reverse", justifyContent:"center"}}>
              <input {...getInputProps()} />
              <Typography>{innerText}</Typography>
              <Add/>
        </Box>
      )
    }

    return (
      <>
        {children}
      </>
    )
};

export default DragZone;
