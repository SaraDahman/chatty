// import './index.css';
import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import AuthContext from './context/AuthContext';
import Chat from './pages/Chat';
import Register from './pages/Register';
import Login from './pages/Login';
import NavBar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import ChatContextProvider from './context/ChatContextProvider';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <ChatContextProvider user={user}>
      <NavBar />
      <Container>
        <Routes>
          <Route
            path='/'
            element={user ? <Chat /> : <Navigate to='/login' />}
          />
          <Route
            path='/register'
            element={user ? <Navigate to='/' /> : <Register />}
          />
          <Route
            path='/login'
            element={user ? <Navigate to='/' /> : <Login />}
          />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Container>
    </ChatContextProvider>
  );
}

export default App;
