import React, { useContext } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from '../api/axios';
import AuthContext from '../context/AuthContext';

const GoogleAuth = ({ mode, setErrorMessage }) => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const { updateUser } = useContext(AuthContext);

  const handleSuccess = async (credentialResponse) => {
    try {
      const { data } = await axios.post('/api/auth/google', {
        credentialResponse,
        mode,
      });

      localStorage.setItem('user', JSON.stringify(data));
      updateUser(data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log('Failed');
        }}
        text={mode == 'sign up' ? 'signup_with' : ''}
      />
    </GoogleOAuthProvider>
  );
};
export default GoogleAuth;
