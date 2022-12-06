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
                  let rows,count,messageItem;
                  if(data.rows)
                  {
                    rows= data.rows;                    
                    count = data.count;
                  }
                  else
                  {
                    messageItem = data;
                    let message = {...messageItem?.message,user: messageItem?.user,sent: true};
                    rows = [message];
                  }

                  updateCachedData((draft) => {
                    const dialogId = rows[0].dialogId;
                    if(!draft.dialogs[dialogId])
                    {
                      draft.dialogs.push({dialogId,rows:[],count:0});
                    } 
                    draft.dialogs.filter(x=> x.dialogId === dialogId)[0].rows.push(...rows);
                    draft.dialogs.filter(x=> x.dialogId === dialogId)[0].count = count ?? draft.dialogs.filter(x=> x.dialogId === dialogId)[0].count;
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