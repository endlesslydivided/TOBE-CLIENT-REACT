//@ts-nocheck
import { styled } from  '@mui/material/styles';
import { Avatar, Card, IconButton, ImageList, ImageListItem, ImageListItemBar, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Add, CheckBox, Close, DateRange, FileCopy, InsertDriveFile, Language, LocationCity, Send, TextFormat, TextSnippet, TitleOutlined, Wc } from '@mui/icons-material';

import Image from 'mui-image';

interface IPostListImagesProps
{
    attachments: any[]
}

const PostListImages: FC<IPostListImagesProps> = ({attachments}) => {
  return (
    <ImageList cols={2}>
    {
      attachments.map((item)=>
      {
        return (
          <ImageListItem key={item.id}>
              {
                item.data.type === 'video/mp4'
                ?
                <video width="100%" height="100%" controls>
                  <source  src={process.env.REACT_APP_API_URL + item?.path}/>
                </video>
                  :
                <Image src={process.env.REACT_APP_API_URL + item?.path} alt={item.id} />
              }
          </ImageListItem>
        )
      })
    }
  </ImageList>
  )
}

export default PostListImages