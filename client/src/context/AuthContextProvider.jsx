import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import AuthContext from './AuthContext';
import { registerUser, loginUser } from '../api/auth';

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerInfo, setRegisterInfo] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    setUser(userInfo);
  }, []);

  const updateRegisterInfo = useCallback((userInfo) => {
    setRegisterInfo(userInfo);
  }, []);

  const updateLoginInfo = useCallback((userInfo) => {
    setLoginInfo(userInfo);
  }, []);

  const updateUser = useCallback((userInfo) => {
    setUser(userInfo);
  }, []);

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setUser(data);
    },
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data);
    },
  });

  const handleLogOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  // const registerUser = useCallback(async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);
  //     const { data } = await axios.post('/api/users/register', registerInfo);

  //     console.log(data);

  //     localStorage.setItem('user', JSON.stringify(data));
  //     setUser(user);

  //     setLoading(false);
  //   } catch (error) {
  //     console.log(error.response.data.message);

  //     setError(error.response.data.message);
  //     setLoading(false);
  //   }
  // }, [registerInfo, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerMutation,
        updateUser,

        loginInfo,
        updateLoginInfo,
        loginMutation,

        handleLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
