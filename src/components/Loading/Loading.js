import {View, Text, Modal, ActivityIndicator} from 'react-native';
import React from 'react';
import styles from './loadingStyle';
import Lottie from 'lottie-react-native';
const Loading = ({visible}) => {
  return (
    <Modal visible={visible} transparent style={styles.modal}>
      <View style={styles.container}>
        <Lottie
          autoPlay
          loop
          source={require('../../assets/97952-loading-animation-blue.json')}
        />
      </View>
    </Modal>
  );
};

export default Loading;
