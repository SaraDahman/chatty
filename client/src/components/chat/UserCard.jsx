import { Stack, Image } from 'react-bootstrap';
import moment from 'moment';
import { useFetchRecipient } from '../../hooks/useFetchRecipient';
import avatar from '../../assets/avatar2.png';

const UserCard = ({ chat, user, updateCurrentChat, onlineUsers }) => {
  // const { recipient, isLoading } = useFetchRecipient(chat, user);
  const isLoading = false;
  const recipient = chat.sender._id == user._id ? chat.receiver : chat.sender;

  return (
    <>
      {isLoading ? (
        <p>card loading ... </p>
      ) : (
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
            {chat.unreadCounts[user._id] &&
              chat.unreadCounts[user._id] !== 0 && (
                <div className='this-user-notifications'>
                  {chat.unreadCounts[user._id]}
                </div>
              )}
          </div>
        </Stack>
      )}
    </>
  );
};

export default UserCard;
