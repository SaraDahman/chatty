import { useCallback, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import ChatContext from './ChatContext';

import { getUserChats, createChat } from '../api/chats';
import { getPotentialUsers } from '../api/auth';

const ChatContextProvider = ({ children, user }) => {
  const [currentChat, setCurrentChat] = useState(null);

  const queryClient = useQueryClient();

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

  // console.log(potentialChats.data, 'chat context provider');

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

  const updateCurrentChat = useCallback((chat) => {
    console.log(chat);

    setCurrentChat(chat);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        fetchChatsResponse,
        potentialChats,
        createChatMutation,

        updateCurrentChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
