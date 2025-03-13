import { Stack, Image } from 'react-bootstrap';
import moment from 'moment';
import { useFetchRecipient } from '../../hooks/useFetchRecipient';
import avatar from '../../assets/avatar2.png';
import { useMemo } from 'react';

const UserCard = ({
  chat,
  user,
  updateCurrentChat,
  onlineUsers,
  currentChat,
}) => {
  // const { recipient, isLoading } = useFetchRecipient(chat, user);
  const recipient = chat.sender._id == user._id ? chat.receiver : chat.sender;

  const notificationsCount = useMemo(() => {
    return currentChat && currentChat._id === chat._id
      ? 0
      : chat.unreadCounts[user._id];
  }, [chat, user, currentChat]);

  return (
    <>
      <Stack
        direction='horizontal'
        gap={3}
        className='user-card align-items-center p-2 justify-content-between'
        role='button'
        onClick={() => updateCurrentChat(chat, recipient)}
      >
        <div className='d-flex'>
          <div
            className='me-2'
            style={{
              backgroundColor: '#fff',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image src={avatar} width={40} height={40} roundedCircle />
          </div>
          <div className='text-content'>
            <div>
              <span className='name mr-5'>{recipient.name}</span>
              {onlineUsers?.some((user) => user.userId == recipient._id) && (
                <span className='user-online'></span>
              )}
            </div>
            <div className='text'>{chat.lastMessage}</div>
          </div>
        </div>
        <div className='d-flex flex-column align-items-end'>
          <div className='date mb-1'>{moment(chat.updatedAt).calendar()}</div>
          {notificationsCount ? (
            <div className='this-user-notifications'>{notificationsCount}</div>
          ) : (
            <></>
          )}
        </div>
      </Stack>
    </>
  );
};

export default UserCard;
