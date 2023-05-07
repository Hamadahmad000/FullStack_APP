import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Input from '../../components/input/Input';
import AppView from '../../components/appView/AppView';
import styles from './signupStyle';
import AppText from '../../components/appText/AppText';
import Button from '../../components/button/Button';
import {WhatResponse, isValidUser} from '../../helper/ErrorHelper';
import {StackActions, useNavigation} from '@react-navigation/native';
import AppScrollView from '../../components/AppScrollView/AppScrollView';
import Toast from 'react-native-toast-message';
import {route} from '../../config/Axios';
import Loading from '../../components/Loading/Loading';
import {SignIn} from '../../Api/user';
const Signup = () => {
  const [Error, setError] = useState('');
  const [state, setstate] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    secureText: true,
  });

  const navigation = useNavigation();

  const SignupUser = async () => {
    try {
      if (isValidUser(state)) {
        updateState({isLoading: true});
        const response = await route.post('/signup', {
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
        });
        // console.log(response.data);
        if (response.data) {
          WhatResponse(response.data);
        }
        updateState({isLoading: false});
        if (response.data.success) {
          const loginResponse = await SignIn(email, password);
          console.log(loginResponse.data);
          if (loginResponse.data.success) {
            navigation.replace('UploadProfile', {
              token: loginResponse.data.token,
            });
          }
        }
      }
    } catch (error) {
      updateState({isLoading: false});
      console.log(error);
    }
  };
  const {email, isLoading, password, secureText, name, confirmPassword} = state;
  const updateState = data => setstate(() => ({...state, ...data}));

  return (
    <AppView flex={1} style={styles.container} padding={20}>
      <AppScrollView showsVerticalScrollIndicator={false}>
        <AppView useKeyboardView={true}>
          {Error && (
            <AppText
              alignSelf={'center'}
              fontSize={14}
              textColor={'red'}
              style={{color: 'red'}}>
              {Error}
            </AppText>
          )}
          <Input
            title={'Username'}
            placeholder={'Name'}
            marginTop={10}
            value={name}
            onChangeText={name => updateState({name})}
          />
          <Input
            title={'Email'}
            placeholder={'Email'}
            marginTop={10}
            value={email}
            onChangeText={email => updateState({email})}
          />
          <Input
            title={'Password'}
            placeholder={'Password'}
            marginTop={10}
            value={password}
            secureTextEntry={secureText}
            onChangeText={password => updateState({password})}
          />
          <Input
            title={'Confirm password'}
            placeholder={'Confirm Password'}
            marginTop={10}
            value={confirmPassword}
            secureTextEntry={secureText}
            onChangeText={confirmPassword => updateState({confirmPassword})}
          />
        </AppView>
        <Button
          text={'Signup'}
          paddingHorizontal={10}
          paddingVertical={7}
          backgroundColor={'red'}
          width={'100%'}
          alignSelf={'center'}
          marginTop={10}
          onPress={SignupUser}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <AppText
            fontSize={'h5'}
            textColor={'red'}
            alignSelf={'center'}
            marginTop={10}>
            Already have an account ? Login
          </AppText>
        </TouchableOpacity>
      </AppScrollView>
      <Toast topOffset={10} visibilityTime={2500} />
      <Loading visible={isLoading} />
    </AppView>
  );
};

export default Signup;
