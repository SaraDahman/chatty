import { Container, Navbar, Stack, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const NavBar = () => {
  const { user, handleLogOut } = useContext(AuthContext);

  return (
    <Navbar className='bg-body-tertiary px-5 mb-4' data-bs-theme='dark'>
      <Navbar.Brand style={{ fontSize: '2.3rem', fontWeight: '700' }}>
        <Link to='/' className='text-decoration-none text-white'>
          <i
            className='bi bi-chat-heart-fill'
            style={{ marginRight: '0.7rem' }}
          ></i>
          Chatty
        </Link>
      </Navbar.Brand>
      <Navbar.Collapse className='justify-content-end'>
        {user ? (
          <Stack direction='horizontal' gap={4}>
            <Navbar.Text className='text-white'>
              Logged in as <b className='text-warning'>{user.name}</b>
            </Navbar.Text>
            <Button variant='outline-light' size='sm' onClick={handleLogOut}>
              Log Out
            </Button>
          </Stack>
        ) : (
          <Stack direction='horizontal' gap={2}>
            <Button as={Link} to='/register' variant='outline-light'>
              Register
            </Button>
            <Button as={Link} to='/login' variant='outline-light'>
              Log in
            </Button>
          </Stack>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
