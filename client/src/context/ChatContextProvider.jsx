import { io } from 'socket.io-client';
import { useCallback, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import ChatContext from './ChatContext';

import {
  getUserChats,
  createChat,
  getChatMessages,
  createMessage,
} from '../api/chats';
import { getPotentialUsers } from '../api/auth';

const ChatContextProvider = ({ children, user }) => {
  const [currentChat, setCurrentChat] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(null);
  const queryClient = useQueryClient();

  // console.log(onlineUsers);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // get online users
  useEffect(() => {
    if (socket) {
      socket.emit('addOnlineUser', user?._id);

      socket.on('getOnlineUsers', (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.off('getOnlineUsers');
      };
    }
  }, [socket, user]);

  // receive the message when someone sends me one
  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', ({ message }) => {
        console.log(message);

        if (message.chatId !== currentChat?._id) return;

        queryClient.setQueryData(['messages', currentChat], (oldData) => {
          if (oldData) {
            return [...oldData, message];
          }
          return [message];
        });
      });

      return () => {
        socket.off('receiveMessage');
      };
    }
  }, [socket, currentChat, queryClient]);

  // Fetch chats
  const fetchChatsResponse = useQuery({
    queryKey: ['chats', user],
    queryFn: () => getUserChats(user._id),
    enabled: !!user,
  });

  //fetch all users for potential chats
  const potentialChats = useQuery({
    queryKey: ['potentialChats'],
    queryFn: getPotentialUsers,
    enabled: !!user,
  });

  // fetch chat messages
  const chatMessages = useQuery({
    queryKey: ['messages', currentChat],
    queryFn: () => getChatMessages(currentChat._id),
    enabled: !!currentChat,
  });

  // create a chat
  const createChatMutation = useMutation({
    mutationFn: createChat,
    onSuccess: (data) => {
      // add new chat
      queryClient.setQueryData(['chats', user], (oldData) => {
        if (oldData) {
          return [...oldData, data];
        }
        return [data];
      });

      //update potential chats
      queryClient.setQueryData(['potentialChats'], (oldData) => {
        return oldData.filter((e) => {
          return e._id !== data.senderId && e._id !== data.receiverId;
        });
      });
    },
  });

  // send a message
  const messageMutation = useMutation({
    mutationFn: createMessage,
    onSuccess: (data) => {
      queryClient.setQueryData(['messages', currentChat], (oldData) => {
        if (oldData) {
          return [...oldData, data];
        }
        return [data];
      });

      // emit a socket event to send a message for the other user
      if (socket) {
        socket.emit('sendMessage', {
          senderId: user._id,
          recipientId:
            currentChat.senderId == user._id
              ? currentChat.receiverId
              : currentChat.senderId,
          message: data,
        });
      }
    },
  });

  const updateCurrentChat = useCallback((chat, recipient) => {
    setCurrentChat(chat);
    setRecipient(recipient);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        fetchChatsResponse,
        potentialChats,
        createChatMutation,

        currentChat,
        recipient,
        updateCurrentChat,
        chatMessages,

        messageMutation,

        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
