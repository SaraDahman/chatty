import { useContext } from 'react';
import ChatContext from '../context/ChatContext';
import { Container, Stack } from 'react-bootstrap';
import UserCard from '../components/chat/UserCard';
import PotentialChats from '../components/chat/PotentialChats';
import AuthContext from '../context/AuthContext';

const Chat = () => {
  const { user } = useContext(AuthContext);
  const {
    fetchChatsResponse: { data, isLoading },
    updateCurrentChat,
  } = useContext(ChatContext);

  return (
    <Container>
      <PotentialChats user={user} />

      <h3 className='mb-4'>Your Chats </h3>
      {isLoading ? (
        <p>Loading ..</p>
      ) : !data?.length ? (
        <p>You haven't started a conversation yet</p>
      ) : (
        <Stack direction='horizontal' className='align-items-start' gap={4}>
          <Stack className='messages-box flex-grow-0 pe-3' gap={3}>
            {data.map((chat, i) => (
              <div key={i}>
                <UserCard
                  chat={chat}
                  user={user}
                  updateCurrentChat={updateCurrentChat}
                />
              </div>
            ))}
          </Stack>
          <div>chat box</div>
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
