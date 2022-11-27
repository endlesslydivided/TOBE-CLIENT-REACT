//@ts-nocheck
import { styled } from  '@mui/material/styles';
import { Avatar, Card, IconButton, ImageList, ImageListItem, ImageListItemBar, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Add, CheckBox, Close, DateRange, FileCopy, InsertDriveFile, Language, LocationCity, Send, TextFormat, TextSnippet, TitleOutlined, Wc } from '@mui/icons-material';

import Image from 'mui-image';

interface IPostFormImagesProps
{
    files: any[]
    setFiles: Function;
}

const PostFormImages: FC<IPostFormImagesProps> = ({files,setFiles}) => {
  return (
    <ImageList cols={5}>
    {
      files.filter(x => ['image/jpeg','image/png','image/jpg','video/mp4'].some(y => y === x.data.type)).map((item)=>
      {
        return (
          <ImageListItem key={item.id}>
              {item.data.type === 'video/mp4'?
              <video width="100%" height="100%" controls>
                <source  src={URL.createObjectURL(item.data)} />
              </video>
                :
              <Image src={URL.createObjectURL(item.data)} alt={item.id} />
              }
              <ImageListItemBar
                position='top'
                sx={{ background:'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%,rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 100%)'}}
                actionIcon={
                  <IconButton onClick={() => setFiles([...files.filter((x) => x.id !== item.id)])} sx={{ color: 'error.main' }}>
                    <Close/>
                  </IconButton>
                }
              />
          </ImageListItem>
        )
      })
    }
  </ImageList>
  )
}

export default PostFormImages