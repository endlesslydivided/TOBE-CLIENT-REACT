
//@ts-nocheck
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, ButtonBase, Card, CardContent, CardHeader, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { FC, ReactNode, useEffect } from 'react';
import { Add, Check, Close, DateRange, Delete, Language, LocationCity, Wc } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Image from 'mui-image';
import { DateTimePicker } from '@mui/lab';
import { Stack } from '@mui/system';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { useCreateFriendMutation, useDeleteFriendMutation, useUpdateFriendMutation } from '../../services/FriendsApiSlice';
import { toast } from 'react-toastify';
import {fDateTime} from '../../utils/formatTime'
import PostListImages from '../postParts/imageList/PostListImages copy';
import { getAudios, getImages, getVideos } from '../../utils/fileTypesFilter';
import PostListAudios from '../postParts/audioList/PostListAudios';
import PostListDocs from '../postParts/docsList/PostListDocs';

interface PostItemProps
{
    post: any;
    cardSx?: object;
}

const PostItem:FC<PostItemProps> = ({post,cardSx}) => {

    
    const imagesVideos = [...getImages(post.attachments),...getVideos(post.attachments)]
    const audios = [...getAudios(post.attachments)];
    const docs = post.attachments.filter((x)=> ![...imagesVideos,...audios].some(y => y.path === x.path));

    return (
    <Card sx={{width:"100%",...cardSx}}>
        <CardContent>
            <Grid container alignItems="center" sx={{p:2}} rowSpacing={0.1}  justifyContent="space-between"spacing={7} >
                <Grid  item xs={12} sm={12} md={11} >      
                    <Link style={{textDecoration: 'none'}}  to={`/user/users/${post?.user?.id}`}>
                        <Stack direction="row" sx={{mx:2,mb:1}} spacing={2} >
                            <ListItemAvatar>
                                <Avatar  sx={{ width: "50px" , height: "50px" }} alt={`${post.user.firstName} ${post.user.lastName}`} 
                                src={post?.user?.photo?.path && process.env.REACT_APP_API_URL + post?.user.photo?.path}  />
                            </ListItemAvatar>
                            <ListItemText 
                            sx={{py:0.2}}
                            secondaryTypographyProps={{mt:0.5}}
                            primary={`${post.user.firstName} ${post.user.lastName}`}
                            secondary={
                                <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.secondary">
                                    {fDateTime(post.createdAt)}
                                </Typography>         
                            }
                            />
                        </Stack>
                    </Link>
                </Grid>
                <Grid item xs={12}  > 
                    <ListItemText
                    sx={{mx:2,mt:0,mb:2}}
                    primary={`${post.content}`}
                    
                    />
                </Grid>
                {imagesVideos.length !== 0 && <Grid item xs={12}  > 
                    <PostListImages sx={{mx:2}} attachments={imagesVideos}/>
                </Grid>}
                {docs.length !== 0 && <Grid item xs={12}  > 
                    <PostListDocs sx={{mx:2}} attachments={docs}/>
                </Grid>}
                {audios.length !== 0 && <Grid item xs={12}  > 
                    <PostListAudios sx={{pt:0}} attachments={audios}/>
                </Grid>}
                
            </Grid>
        </CardContent>
    </Card>
        
  )
}

export default PostItem