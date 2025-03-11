import { Button, Spinner, Stack } from 'react-bootstrap';
import moment from 'moment';
import InputEmoji from 'react-input-emoji';
import { useEffect, useRef, useState } from 'react';

const ChatBox = ({
  currentChat,
  recipient,
  chatMessages,
  user,
  messageMutation,
}) => {
  const [textMessage, setTextMessage] = useState('');
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages.data]);

  if (chatMessages.isLoading) {
    return (
      <div style={{ textAlign: 'center', width: '100%' }}>
        <Spinner animation='border' variant='primary' size='xl' />
      </div>
    );
  }

  if (!chatMessages.data) {
    return (
      <p style={{ textAlign: 'center', width: '100%', fontWeight: 'bold' }}>
        No chat was selected yet
      </p>
    );
  }

  const handleCreateMessage = () => {
    messageMutation.mutate({
      senderId: user._id,
      chatId: currentChat._id,
      text: textMessage,
    });

    setTextMessage('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && textMessage.trim()) {
      event.preventDefault();
      handleCreateMessage();
    }
  };

  return (
    <Stack gap={4} className='chat-box'>
      <div className='chat-header'>
        <b>Chat with {recipient.name}</b>
      </div>
      <Stack gap={3} className='messages'>
        {chatMessages.data &&
          chatMessages.data.map((e) => {
            return (
              <Stack
                key={e._id}
                className={`${
                  e.senderId == user._id
                    ? 'message self align-self-end flex-grow-0'
                    : 'message align-self-start flex-grow-0'
                }`}
                ref={scroll}
              >
                <span className='mb-1'>{e.text}</span>
                <span className='message-footer'>
                  {moment(e.createdAt).calendar()}
                </span>
              </Stack>
            );
          })}
      </Stack>

      <Stack direction='horizontal' gap={3} className='chat-input flex-grow-0'>
        <InputEmoji
          value={textMessage}
          onChange={setTextMessage}
          onKeyDown={handleKeyDown}
          fontFamily='nunito'
          borderColor='rgba(72, 112, 223, 0.2)'
        />
        <Button
          className='send-btn p-0'
          style={{ borderRadius: '50%' }}
          variant='primary'
          onClick={handleCreateMessage}
          disabled={!textMessage.trim()}
        >
          <i className='bi bi-send-fill'></i>
        </Button>
      </Stack>
    </Stack>
  );
};

export default ChatBox;
