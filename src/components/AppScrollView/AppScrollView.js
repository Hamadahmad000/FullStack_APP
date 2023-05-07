import {View, Text, ScrollView} from 'react-native';
import React from 'react';

const AppScrollView = ({
  children,
  containerBottomPending,
  containerLeftPending,
  contentContainerStyle,
  flex,
  ...props
}) => {
  const extraStyle = {};
  const containerExtraStyle = {};

  if (containerBottomPending) {
    containerExtraStyle.paddingBottom = containerBottomPending;
  }
  if (containerLeftPending) {
    containerExtraStyle.paddingLeft = containerLeftPending;
  }
  if (flex) {
    containerExtraStyle.flex = flex;
  }

  return (
    <ScrollView
      style={[extraStyle]}
      {...props}
      contentContainerStyle={[contentContainerStyle, containerExtraStyle]}>
      {children}
    </ScrollView>
  );
};

export default AppScrollView;
