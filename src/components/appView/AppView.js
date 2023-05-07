import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import {THEME_COLORS} from '../../constant/Theme';

const AppView = ({
  children,
  useSafeAreaView,
  useKeyboardView,
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
  flex,
  flexGrow,
  alignItems,
  justifyContent,
  alignSelf,
  width,
  height,
  appColor,
  padding,
}) => {
  const extraStyle = {};
  if (flex) {
    extraStyle.flex = 1;
  }
  if (flexGrow) {
    extraStyle.flexGrow = flexGrow;
  }
  if (alignSelf) {
    extraStyle.alignSelf = alignSelf;
  }

  if (alignItems) {
    extraStyle.alignItems = alignItems;
  }
  if (justifyContent) {
    extraStyle.justifyContent = justifyContent;
  }

  if (width) {
    extraStyle.width = width;
  }
  if (height) {
    extraStyle.height = height;
  }
  if (padding) {
    extraStyle.padding = padding;
  }
  if (paddingTop) {
    extraStyle.paddingTop = paddingTop;
  }
  if (paddingHorizontal) {
    extraStyle.paddingHorizontal = paddingHorizontal;
  }
  if (paddingVertical) {
    extraStyle.paddingVertical = paddingVertical;
  }

  if (marginBottom) {
    extraStyle.marginBottom = marginBottom;
  }

  if (marginTop) {
    extraStyle.marginTop = marginTop;
  }

  if (borderRadius) {
    extraStyle.borderRadius = borderRadius;
  }
  if (appColor) {
    const appColor1 = THEME_COLORS[appColor];
    extraStyle.backgroundColor = appColor1;
  }
  if (useKeyboardView) {
    return (
      <SafeAreaView style={[style, extraStyle]}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : null}
          style={[style, extraStyle]}>
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  if (useSafeAreaView) {
    return <SafeAreaView style={[style, extraStyle]}>{children}</SafeAreaView>;
  }
  return <View style={[style, extraStyle]}>{children}</View>;
};

export default AppView;
