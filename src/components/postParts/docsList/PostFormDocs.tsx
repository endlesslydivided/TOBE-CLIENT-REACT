//@ts-nocheck
import { styled } from  '@mui/material/styles';
import { Avatar, Card, IconButton, ImageList, ImageListItem, ImageListItemBar, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Add, CheckBox, Close, DateRange, FileCopy, InsertDriveFile, Language, LocationCity, Send, TextFormat, TextSnippet, TitleOutlined, Wc } from '@mui/icons-material';
import { fData } from '../../../utils/formatStorageSize';


interface IPostFormDocsProps
{
    files: any[]
    setFiles: Function;
}

const PostFormDocs: FC<IPostFormDocsProps> = ({files,setFiles}) => {
  return (
    <List sx={{p:0}}>
    {
      files.filter(x => !['image/jpeg','audio/mpeg','image/png','image/jpg','video/mp4'].includes(x.data.type)).map((item)=>
      {
        return (
          <ListItem secondaryAction={
            <IconButton onClick={() => setFiles([...files.filter((x) => x.id !== item.id)])} sx={{ color: 'error.main' }}>
              <Close/>
            </IconButton>}>
          <ListItemAvatar>
            <Avatar>
              <InsertDriveFile />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={item.name}
            secondary= {`${item.data.type} ${fData(item.data.size)}`}
          />
        </ListItem>
        )
      })
    }
  </List>
    
  )
}

export default PostFormDocs