//@ts-nocheck
import { styled } from  '@mui/material/styles';
import { Avatar, Card, IconButton, ImageList, ImageListItem, ImageListItemBar, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Add, CheckBox, Close, DateRange, FileCopy, InsertDriveFile, Language, LocationCity, Send, TextFormat, TextSnippet, TitleOutlined, Wc } from '@mui/icons-material';
import { fData } from '../../../utils/formatStorageSize';


interface IPostListDocsProps
{
  attachments: any[]
}

const PostListDocs: FC<IPostListDocsProps> = ({attachments}) => {
  return (
    <List sx={{p:0}}>
    {
      attachments.map((item)=>
      {
        return (
        <Link src={process.env.REACT_APP_API_URL + item?.path}>
          <ListItem>
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
        </Link>
        )
      })
    }
  </List>
    
  )
}

export default PostListDocs