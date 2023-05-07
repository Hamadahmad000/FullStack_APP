import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AppView from '../appView/AppView';
import AppText from '../appText/AppText';

import {isLogin} from '../../context/stateProvider';

const DrawerContent = props => {
  //   const fetchData = async () => {
  //     try {
  // const {profile} = isLogin();
  // console.log(profile);
  // } catch (error) {
  //   console.log(`Error while fetching data ${error.message}`);
  // }
  //   };
  //   useEffect(() => {
  //     fetchData();
  //   }, []);
  return (
    <AppView flex={1}>
      <DrawerContentScrollView {...props}>
        <AppView
          paddingHorizontal={10}
          paddingVertical={10}
          justifyContent={'center'}>
          <AppText fontSize={16} fontWeight={'bold'}>
            Hamad
          </AppText>
          {/* <Image source={}/> */}
        </AppView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </AppView>
  );
};

export default DrawerContent;
