//@ts-nocheck
import { styled } from  '@mui/material/styles';
import { Avatar, Card, IconButton, ImageList, ImageListItem, ImageListItemBar, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Add, CheckBox, Close, DateRange, FileCopy, InsertDriveFile, Language, LocationCity, Send, TextFormat, TextSnippet, TitleOutlined, Wc } from '@mui/icons-material';

import Image from 'mui-image';

interface IPostListAudiosProps
{
  attachments: any[]
}

const PostListAudios: FC<IPostListAudiosProps> = ({attachments,...other}) => {
  return (
    <List {...other} >
    {
    attachments.map((item)=>
    {
        return (
        <ListItem sx={{py:0}}>
            <audio controls src={process.env.REACT_APP_API_URL + item?.path}/>         
        </ListItem>
        )
    })
    }
</List>
  )
}

export default PostListAudios;