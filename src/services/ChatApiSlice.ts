//@ts-nocheck
import { apiSlice } from "./ApiSlice";
import { io } from 'socket.io-client';

enum ChatClientEvent 
{
    ReceiveMessage = 'receive_message',
    ReceiveDialogs = 'receive_dialogs',
    DialogMessages = 'dialog_messages',
}

enum ChatServerEvent 
{
    SendMessage = 'send_message',
    GetDialogMessages = 'get_dialog_messages',
    GetDialogs = 'get_dialogs',
}

let socket: Socket;
const  getSocket = () =>
{
    if (!socket) 
    {
        socket = io(process.env.REACT_APP_API_URL_WS ,{path: '/chat', withCredentials: true});
    }
    return socket;
}


export const chatApiSlice = apiSlice.injectEndpoints({   
    endpoints: builder => ({
        
        sendMessage: builder.mutation<any, any>({
            queryFn: (chatMessageContent: any) => 
            {
                const socket = getSocket();
                return new Promise(resolve => 
                {
                    socket.emit(ChatServerEvent.SendMessage, chatMessageContent, (message: any) => {
                    resolve({ data: message });
                });
            })
            },
        }),
        getMessages: builder.query<any, void>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(
              body,
              { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
            ) {
              try {
                await cacheDataLoaded;
           
                const socket = getSocket();

                socket.on(ChatClientEvent.ReceiveMessage, (message: any) => {
                    updateCachedData((draft) => {
                      draft.push(message);
                    });
                  });
           
                socket.on('connect', () => {
                  socket.emit(ChatServerEvent.GetDialogMessages,body);
                });
           
                await cacheEntryRemoved;
           
                socket.off('connect');
                socket.off(ChatServerEvent.ReceiveMessage);
              } catch {
                              
              }
            },
        }),
        getDialogs: builder.query<any, void>({
            queryFn: () => ({ data: [] }),
            async onCacheEntryAdded(
              body,
              { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
            ) {
              try {
                await cacheDataLoaded;
           
                const socket = getSocket();

                socket.on(ChatClientEvent.ReceiveDialogs, (message: any) => {
                    updateCachedData((draft) => {
                      draft.push(message);
                    });
                  });
           
                socket.on('connect', () => {
                  socket.emit(ChatServerEvent.GetDialogs,body);
                });
           
                await cacheEntryRemoved;
           
                socket.off('connect');
                socket.off(ChatServerEvent.ReceiveDialogs);
              } catch {
                              
              }
            },
        }),
    })
})



export const {
useSendMessageMutation,
useGetMessagesQuery,
useGetDialogsQuery,} = chatApiSlice;