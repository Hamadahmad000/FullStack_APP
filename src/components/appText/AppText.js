import {View, Text} from 'react-native';
import React from 'react';
import {APP_FONT_SIZE, THEME_COLORS} from '../../constant/Theme';
import {hexToRgbA} from '../../helper/ThemeHelper';

const AppText = ({
  //  fontStyle,
  textAlign,
  textColor,
  fontSize,
  fontWeight,
  marginTop,
  marginBottom,
  marginLeft,
  marginRight,
  paddingHorizontal,
  paddingVertical,
  textColorOpacity,
  children,
  alignSelf,
  style,
}) => {
  // if (fontStyle) {
  //     const fontFamily = getFontFamily(fontStyle);
  //     extraStyle.fontFamily = fontFamily;
  //   }
  const extraStyle = {};
  if (textAlign) {
    extraStyle.textAlign = textAlign;
  }

  if (textColor) {
    let textColor1 = THEME_COLORS[textColor];
    if (textColorOpacity) {
      textColor1 = hexToRgbA(textColor, textColorOpacity);
    }
    extraStyle.color = textColor1;
  }
  //  else if (!isDarkTheme) {
  //   extraStyle.color = themeColors.text;
  // }

  if (fontSize) {
    let fontSize1 = APP_FONT_SIZE.h5;
    if (typeof fontSize === 'string') {
      fontSize1 = APP_FONT_SIZE[fontSize];
    }
    if (typeof fontSize === 'number') {
      fontSize1 = fontSize;
    }
    extraStyle.fontSize = fontSize1;
  }
  if (fontWeight) {
    extraStyle.fontWeight = fontWeight;
  }
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
  if (alignSelf) {
    extraStyle.alignSelf = alignSelf;
  }
  return <Text style={[extraStyle, style]}>{children}</Text>;
};

export default AppText;
