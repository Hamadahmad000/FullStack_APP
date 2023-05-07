import {View, Text} from 'react-native';
import React from 'react';
import AppScrollView from '../../components/AppScrollView/AppScrollView';
import AppView from '../../components/appView/AppView';
import styles from './homeStyle';
import AppText from '../../components/appText/AppText';

const Home = () => {
  return (
    <AppScrollView flex={1}>
      <AppView
        flex={1}
        style={styles.container}
        alignItems={'center'}
        justifyContent={'center'}>
        <AppText>Hello</AppText>
      </AppView>
    </AppScrollView>
  );
};

export default Home;
