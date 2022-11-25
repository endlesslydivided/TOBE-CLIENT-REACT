import { AccountCircleOutlined, ChatBubbleOutlineOutlined, FeedOutlined, Newspaper, PeopleOutline, PhotoLibraryOutlined } from '@mui/icons-material'

import {ADMIN_ROUTE,LOGIN_ROUTE,REGISTRATION_ROUTE,FEED_ROUTE,ALBUM_ROUTE,CHAT_ROUTE,MAIN_ROUTE,ERROR_ROUTE,PROFILE_ROUTE, USERS_ROUTE,} from './consts'


export const roleRoutesManager= 
[
    {
        mainPath: '/user',
        role: 'USER',
        routes:[
            {
                route: PROFILE_ROUTE,
                Icon: AccountCircleOutlined,
                text: 'Профиль',
                index: true
            },
            {
                route: CHAT_ROUTE,
                Icon: ChatBubbleOutlineOutlined,
                text: 'Сообщения'
            },
            {
                route: USERS_ROUTE,
                Icon: PeopleOutline,
                text: 'Пользователи'
            },
            {
                route: FEED_ROUTE,
                Icon: FeedOutlined,
                text: 'Новости'
            },
            {
                route: ALBUM_ROUTE,
                Icon: PhotoLibraryOutlined,
                text: 'Фотографии',
                disabled: true
            },
            ]
    },
    {
        mainPath: '/admin',
        role: 'ADMIN',
        routes:['/']
    }
]
    
 
export const anonymousRoutesManager =
{
    mainPath: '/',
    routes:[LOGIN_ROUTE,REGISTRATION_ROUTE]
}

   