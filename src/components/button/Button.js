import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './buttonStyle';
import {getFontFamily} from '../../helper/ThemeHelper';
import {APP_FONT_SIZE} from '../../constant/Theme';

const Button = ({
  text,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  paddingHorizontal,
  paddingVertical,
  backgroundColor,
  width,
  alignSelf,
  onPress,
  color,
  fonStyle,
  fontSize,
  containerStyle,
  style,
  borderRadius,
}) => {
  // Button Container Color
  const extraStyle = {};
  if (marginTop) {
    extraStyle.marginTop = marginTop;
  }
  if (marginBottom) {
    extraStyle.marginBottom = marginBottom;
  }
  if (marginLeft) {
    extraStyle.marginLeft = marginLeft;
  }
  if (marginRight) {
    extraStyle.marginRight = marginRight;
  }
  if (paddingHorizontal) {
    extraStyle.paddingHorizontal = paddingHorizontal;
  }
  if (paddingVertical) {
    extraStyle.paddingVertical = paddingVertical;
  }
  if (borderRadius) {
    extraStyle.borderRadius = borderRadius;
  }

  if (width) {
    extraStyle.width = width;
  }
  if (alignSelf) {
    extraStyle.alignSelf = alignSelf;
  }
  if (backgroundColor) {
    extraStyle.backgroundColor = backgroundColor;
  }

  //  Button Text Style

  customStyle = {};

  if (color) {
    customStyle.color = color;
  }
  if (fonStyle) {
    GeneratedFontFamilty = getFontFamily(fonStyle);

    customStyle.fontFamily = GeneratedFontFamilty;
  }
  if (fontSize) {
    let finalFontSize = fontSize;
    if (typeof fontSize == 'string') {
      finalFontSize = APP_FONT_SIZE[fontSize];
    }
    if (typeof fontSize == 'number') {
      finalFontSize = fontSize;
    }
    customStyle.fontSize = finalFontSize;
  }
  return (
    <TouchableOpacity
      style={[extraStyle, styles.Button, containerStyle]}
      onPress={onPress}>
      <Text style={[styles.buttonText, style]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
