import { useContext } from 'react';
import ChatContext from '../../context/ChatContext';
import { Button, Spinner } from 'react-bootstrap';

const PotentialChats = ({ user }) => {
  const { potentialChats, createChatMutation } = useContext(ChatContext);

  return potentialChats.data?.length ? (
    <>
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
                  senderId: user._id,
                  receiverId: e._id,
                });
              }}
              disabled={createChatMutation.isPending}
            >
              {e.name}
              <span className='user-online'></span>
            </Button>
          ))
        )}
      </div>
    </>
  ) : (
    <></>
  );
};

export default PotentialChats;
