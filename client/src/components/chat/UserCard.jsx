import { Stack, Image } from 'react-bootstrap';
import { useFetchRecipient } from '../../hooks/useFetchRecipient';
import avatar from '../../assets/avatar2.png';

const UserCard = ({ chat, user, updateCurrentChat, onlineUsers }) => {
  const { recipient, isLoading } = useFetchRecipient(chat, user);

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
              <div className='text'>text message</div>
            </div>
          </div>
          <div className='d-flex flex-column align-items-end'>
            <div className='date mb-1'>12/12/2024</div>
            <div className='this-user-notifications'>2</div>
          </div>
        </Stack>
      )}
    </>
  );
};

export default UserCard;
