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
    <Container>
      {isLoading ? (
        <p>Loading ..</p>
      ) : (
        <Row>
          <Col sm={4}>
            <div>
              <PotentialChats user={user} />
              <h3 className='mb-4'>Your Chats </h3>
              {!data?.length ? (
                <p>You haven't started a conversation yet</p>
              ) : (
                <Stack className='messages-box flex-grow-0 pe-3' gap={3}>
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
          </Col>
          <Col sm={8}>
            <ChatBox
              currentChat={currentChat}
              recipient={recipient}
              chatMessages={chatMessages}
              user={user}
              messageMutation={messageMutation}
            />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Chat;
