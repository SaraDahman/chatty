import { useContext } from 'react';
import ChatContext from '../context/ChatContext';
import { Container, Stack, Row, Col } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';
import UserCard from '../components/chat/UserCard';
import PotentialChats from '../components/chat/PotentialChats';
import ChatBox from '../components/chat/ChatBox';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const {
    fetchChatsResponse: { data, isLoading },
    updateCurrentChat,
    currentChat,
    recipient,
    chatMessages,
    messageMutation,
    onlineUsers,
  } = useContext(ChatContext);

  return (
    <div>
      {isLoading ? (
        <p>Loading ..</p>
      ) : (
        <div
          style={{
            display: 'flex',
            gap: '1rem',
          }}
        >
          <div className='chats p-0'>
            <div className='chats-column'>
              <PotentialChats user={user} />
              {!data?.length ? (
                <p>You haven't started a conversation yet</p>
              ) : (
                <Stack className='messages-box flex-grow-0' gap={2}>
                  {data.map((chat, i) => (
                    <div key={i}>
                      <UserCard
                        chat={chat}
                        user={user}
                        updateCurrentChat={updateCurrentChat}
                        onlineUsers={onlineUsers}
                        currentChat={currentChat}
                      />
                    </div>
                  ))}
                </Stack>
              )}
            </div>
          </div>
          <div className='chat-box-container'>
            <ChatBox
              currentChat={currentChat}
              recipient={recipient}
              chatMessages={chatMessages}
              user={user}
              messageMutation={messageMutation}
              onlineUsers={onlineUsers}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
