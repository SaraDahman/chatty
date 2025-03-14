import { useContext } from 'react';
import ChatContext from '../../context/ChatContext';
import { Button, Spinner } from 'react-bootstrap';

const PotentialChats = ({ user }) => {
  const { potentialChats, createChatMutation, onlineUsers } =
    useContext(ChatContext);

  return potentialChats.data?.length ? (
    <div className='potential-users'>
      <div className='d-flex align-items-center mb-4'>
        <h3 className='me-4 mb-0'>Add a friend </h3>
        {createChatMutation.isPending && (
          <Spinner animation='border' variant='primary' size='sm' />
        )}
      </div>
      <div className='all-users'>
        {potentialChats.isLoading ? (
          <p>Loading ...</p>
        ) : (
          potentialChats.data.map((e) => (
            <Button
              variant='primary'
              key={e._id}
              onClick={() => {
                createChatMutation.mutate({
                  sender: user._id,
                  receiver: e._id,
                });
              }}
              disabled={createChatMutation.isPending}
            >
              {e.name}
              {onlineUsers?.some((user) => user.userId == e._id) && (
                <span className='user-online'></span>
              )}
            </Button>
          ))
        )}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default PotentialChats;
