//@ts-nocheck
import { styled } from  '@mui/material/styles';
import { Avatar, Card, IconButton, ImageList, ImageListItem, ImageListItemBar, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Add, CheckBox, Close, DateRange, FileCopy, InsertDriveFile, Language, LocationCity, Send, TextFormat, TextSnippet, TitleOutlined, Wc } from '@mui/icons-material';

import Image from 'mui-image';

interface IPostFormAudiosProps
{
    files: any[]
    setFiles: Function;
}

const PostFormAudios: FC<IPostFormAudiosProps> = ({files,setFiles}) => {
  return (
    <List sx={{p:0}}>
    {
    files.filter(x => ['audio/mpeg'].includes(x.data.type)).map((item)=>
    {
        return (
        <ListItem secondaryAction={
            <IconButton onClick={() => setFiles([...files.filter((x) => x.id  !== item.id)])} sx={{ color: 'error.main' }}>
            <Close/>
            </IconButton>}>
            <audio controls src={URL.createObjectURL(item.data)}/>
            
        </ListItem>
        )
    })
    }
</List>
  )
}

export default PostFormAudios;