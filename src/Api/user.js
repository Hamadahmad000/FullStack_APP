import AsyncStorage from '@react-native-async-storage/async-storage';

const {route} = require('../config/Axios');

export const SignIn = async (email, password) => {
  try {
    const response = await route.post('/login', {
      email: email,
      password: password,
    });

    if (response.data.success) {
      const token = response.data.token;
      await AsyncStorage.setItem('token', token);
      return response;
    }
  } catch (error) {
    console.log(`error whiile sign In ${error.message}`);
  }
};
