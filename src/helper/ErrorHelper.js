import Toast from 'react-native-toast-message';

export const isValidObject = obj => {
  // return Object.values(obj).every(val => val.trim());
  return Object.values(obj).every(value => value !== '');
};

export const updateError = (error, stateUpdate) => {
  stateUpdate(error);
  setTimeout(() => {
    stateUpdate('');
  }, 2500);
};

export const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

//
export const handleErrorWithToast = (type, errorType, error) => {
  Toast.show({
    type: type,
    text1: errorType,
    text2: error,
  });
};

//  Signup Validation
export const isValidUser = value => {
  const {email, password, name, confirmPassword} = value;
  // Checking all fields does have values or not
  if (!isValidObject(value))
    return handleErrorWithToast(
      'error',
      'Fields Error',
      'Please fill all fields',
    );

  // Cecking username Length
  if (name == '' || name.length < 3)
    return handleErrorWithToast('error', 'Username Error', 'Invalid username');
  // Checking email is valid or not
  if (!validateEmail(email))
    return handleErrorWithToast('error', 'Email Error', 'Invalid Email');
  // Password must have minimum 8 character
  if (password.length < 8)
    return handleErrorWithToast(
      'error',
      'Password Error',
      'Password is less then 8 character',
    );
  // Matching Both passwords are same
  if (password !== confirmPassword)
    return handleErrorWithToast(
      'error',
      'Confirm Password Error',
      'Please enter both password same',
    );
  return true;
};

// Login Validation
export const isValidUserLogin = value => {
  const {email, password, name, confirmPassword} = value;
  // Checking all fields does have values or not
  if (!isValidObject(value))
    return handleErrorWithToast(
      'error',
      'Fields Error',
      'Please fill all fields',
    );

  // Checking email is valid or not
  if (!validateEmail(email))
    return handleErrorWithToast('error', 'Email Error', 'Invalid Email');
  // Password must have minimum 8 character
  if (password.length < 8)
    return handleErrorWithToast(
      'error',
      'Password Error',
      'Password is less then 8 character',
    );

  return true;
};

//  Checking Response And Toasting
export const WhatResponse = data => {
  console.log(data.message);
  if (data.success) return handleErrorWithToast('success', 'Hurry', 'Success');
  handleErrorWithToast('error', 'Hurry', data.message);
};
