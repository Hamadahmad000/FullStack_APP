import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Input from '../../components/input/Input';
import AppView from '../../components/appView/AppView';
import styles from './loginStyle';
import AppText from '../../components/appText/AppText';
import Button from '../../components/button/Button';
import {WhatResponse, isValidUserLogin} from '../../helper/ErrorHelper';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import Loading from '../../components/Loading/Loading';
import {isLogin} from '../../context/stateProvider';
import {SignIn} from '../../Api/user';
const Login = () => {
  const [state, setstate] = useState({
    isLoading: false,
    email: '',
    password: '',
    secureText: true,
  });
  const {email, isLoading, password, secureText} = state;
  const updateState = data => setstate(() => ({...state, ...data}));
  const {setisLoggedIn} = isLogin();

  const navigation = useNavigation();
  const loginUser = () => {
    if (isValidUserLogin(state)) {
      fetchLoginInfo();
    }
  };
  const fetchLoginInfo = async () => {
    updateState({isLoading: true});
    try {
      const result = await SignIn(email, password);
      if (result.data) {
        WhatResponse(result.data);
      }

      if (result.data) {
        updateState({isLoading: false});
        setisLoggedIn(true);
      }
    } catch (error) {
      updateState({isLoading: false});
      console.log(error);
    }
  };

  return (
    <AppView flex={1} style={styles.container} padding={20}>
      <Input
        title={'Email'}
        placeholder={'Email'}
        marginTop={10}
        value={email}
        onChangeText={email => updateState({email})}
      />
      <Input
        title={'password'}
        placeholder={'Password'}
        marginTop={10}
        value={password}
        secureTextEntry={secureText}
        onChangeText={password => updateState({password})}
      />
      <Button
        text={'Login'}
        paddingHorizontal={10}
        paddingVertical={7}
        backgroundColor={'red'}
        width={'100%'}
        alignSelf={'center'}
        marginTop={20}
        onPress={loginUser}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <AppText
          fontSize={'h5'}
          textColor={'red'}
          alignSelf={'center'}
          marginTop={20}>
          Already have an account ? Sign Up
        </AppText>
      </TouchableOpacity>
      <Toast topOffset={10} visibilityTime={2500} />
      <Loading visible={isLoading} />
    </AppView>
  );
};

export default Login;
