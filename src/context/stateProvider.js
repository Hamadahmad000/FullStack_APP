import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {route} from '../config/Axios';
const LOGIN_CONTEXT = React.createContext();

export const StateProviderContext = ({children}) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [loadingProgress, setloadingProgress] = useState(false);
  const [profile, setprofile] = useState({});

  const fetchUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        const response = await route.get('/profile', {
          headers: {
            Authorization: token,
          },
        });

        if (response.data.success) {
          setisLoggedIn(true);
          await setprofile(response.data);
        } else {
          setprofile({});
          setisLoggedIn(false);
        }
        // console.log(profile);
        // console.log(response.data);
      } else {
        setisLoggedIn(false);
      }
    } catch (error) {
      setisLoggedIn(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <LOGIN_CONTEXT.Provider
      value={{
        isLoggedIn,
        setisLoggedIn,
        loadingProgress,
        setloadingProgress,
        profile,
      }}>
      {children}
    </LOGIN_CONTEXT.Provider>
  );
};

export const isLogin = () => useContext(LOGIN_CONTEXT);
