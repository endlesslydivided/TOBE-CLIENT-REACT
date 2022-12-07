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
const  getSocket = (auth) =>
{
    if (!socket) 
    {
        socket = io.connect(process.env.REACT_APP_API_URL_WS ,{path: '/chat', withCredentials: true,auth,forceNewConnection:true});
    }
    return socket;
}


export const chatApiSlice = apiSlice.injectEndpoints({   
    endpoints: builder => ({
        
        sendMessage: builder.mutation<any, any>({
            queryFn: (body: any) => 
            {
                const socket = getSocket(body.auth);
                return new Promise(resolve => 
                {
                  socket.on(ChatClientEvent.ReceiveMessage, (message: any) => {
                    resolve({ data: message });
             
                  });
         
                  socket.emit(ChatServerEvent.SendMessage, body);
                })
            },
        }),
        getMessages: builder.query<any, void>({
            queryFn: () => ({ data: {count: 0, dialogs: [], havingResults: false} }),
            async onCacheEntryAdded(body,{ cacheDataLoaded, cacheEntryRemoved, updateCachedData }) 
            {
              try 
              {
                await cacheDataLoaded;
           
                const socket = getSocket(body.auth);

                socket.on(ChatClientEvent.ReceiveMessage, (data: any) => 
                {
                  let rows,count,messageItem,dialogId;
                  if(data.messages)
                  {
                    rows= data.messages.rows;                    
                    count = data.messages.count;
                  }
                  else
                  {
                    messageItem = data;
                    let message = {...messageItem?.message,user: messageItem?.user,sent: true};
                    rows = [message];
                  }
                  dialogId = data.dialogId;
                  updateCachedData((draft) => {
                    if(!draft.dialogs.filter(x=> x.dialogId.toString() === dialogId)[0])
                    {
                      draft.dialogs.push({dialogId,rows:[],count:0});
                    } 
                    const dialog = draft.dialogs.filter(x=> x.dialogId.toString() === dialogId)[0];
                    const rowsToSet = rows.filter(message => !dialog.rows.some(x => message.id === x.id))
                    dialog.rows.push(...rowsToSet);
                    dialog.count = count ?? dialog.count;
                    draft.havingResults = true;
                   
                  });            
                      
                });

                if(socket.connected)
                {
                  socket.emit(ChatServerEvent.GetDialogMessages,body);
                }
                socket.on('connect', () => {
                  socket.emit(ChatServerEvent.GetDialogMessages,body);
                });
                
                await cacheEntryRemoved;
           
                socket.off('connect');
                socket.off(ChatServerEvent.ReceiveMessage);
              } catch (error) {
                console.log(error);
                              
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
           
                const socket = getSocket(body.auth);

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
useLazyGetMessagesQuery,
useGetMessagesQuery,
useGetDialogsQuery,} = chatApiSlice;