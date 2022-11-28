//@ts-nocheck
import { styled } from  '@mui/material/styles';
import { Avatar, Card, IconButton, ImageList, ImageListItem, ImageListItemBar, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Add, CheckBox, Close, DateRange, FileCopy, InsertDriveFile, Language, LocationCity, Send, TextFormat, TextSnippet, TitleOutlined, Wc } from '@mui/icons-material';
import { fData } from '../../../utils/formatStorageSize';
import { Link } from 'react-router-dom';


interface IPostListDocsProps
{
  attachments: any[]
}

const PostListDocs: FC<IPostListDocsProps> = ({attachments}) => {
  return (
    <List sx={{p:2}}>
    {
      attachments.map((item)=>
      {
        return (
        <a href={process.env.REACT_APP_API_URL + item?.path} style={{textDecoration:'none',color:"black"}}>
          <ListItem sx={{backgroundColor:"grey.300",borderRadius:'15px'}}>
            <ListItemAvatar>
              <Avatar>
                <InsertDriveFile />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={item.path}
            />
          </ListItem>
        </a>
        )
      })
    }
  </List>
    
  )
}

export default PostListDocs