import {View, Text, TextInput} from 'react-native';
import React from 'react';
import styles from './inputStyle';
import AppView from '../appView/AppView';
import AppText from '../appText/AppText';

const Input = ({
  placeholder,
  style,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  marginHorizontal,
  marginVertical,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  paddingHorizontal,
  paddingVertical,
  borderWidth,
  borderRadius,
  onChangeText,
  value,
  title,

  ...props
}) => {
  const extraStyle = {};

  if (marginTop) {
    extraStyle.marginTop = marginTop;
  }

  return (
    <AppView paddingBottom={0} marginBottom={0}>
      <AppText fontSize={'h6'} marginTop={5} style={{color: 'black'}}>
        {title}
      </AppText>
      <TextInput
        placeholder={placeholder}
        style={[styles.input, extraStyle, style, {}]}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
    </AppView>
  );
};

export default Input;
