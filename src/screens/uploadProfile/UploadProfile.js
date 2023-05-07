import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import AppView from '../../components/appView/AppView';
import styles from './uploadProfileStyle';
import AppText from '../../components/appText/AppText';
import Button from '../../components/button/Button';
import DocumentPicker from 'react-native-document-picker';
import {route} from '../../config/Axios';
import {useNavigation, StackActions, useRoute} from '@react-navigation/native';
import {WhatResponse, handleErrorWithToast} from '../../helper/ErrorHelper';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import Loading from '../../components/Loading/Loading';
import {isLogin} from '../../context/stateProvider';
const UploadProfile = () => {
  const [selectedImage, setselectedImage] = useState(null);
  const [uploadProgress, setuploadProgress] = useState(0);
  const navigation = useNavigation();
  const tokeFromRoute = useRoute().params;
  const {loadingProgress, setloadingProgress} = isLogin();

  const {token} = tokeFromRoute;
  const {setisLoggedIn} = isLogin();

  const pickImage = async () => {
    try {
      const img = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
      });
      setselectedImage(img.uri);
    } catch (error) {
      if (DocumentPicker.isCancel(err)) {
        console.log('user Cancel image picking', err);
      } else {
        console.log(error);
      }
    }
  };

  const uploadImage = async () => {
    setloadingProgress(true);
    const formdata = new FormData();
    formdata.append('profile', {
      name: new Date() + '_Profile',
      uri: selectedImage,
      type: 'image/jpg',
    });

    try {
      // const response = await route.post('/upload-image', formdata, {
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'multipart/form-data',
      //     authorization: token,
      //   },
      // onUploadProgress: ({loaded, total}) =>
      //   setuploadProgress(loaded / total),
      // });
      const result = await route.post('/upload-image', formdata, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      });
      setloadingProgress(false);
      console.log(result.data);
      if (result.data.success) {
        setisLoggedIn(true);
      }
      // if (response.data.success) {
      // WhatResponse(response.data);
      // navigation.dispatch(StackActions.navigate('Drawer'));
      // }
    } catch (error) {
      setloadingProgress(false);
      console.log(error);
      handleErrorWithToast('error', 'Sorry', error.message);
    }
  };
  return (
    <AppView flex={1} style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <AppView style={styles.imageBox}>
          {selectedImage ? (
            <Image style={styles.img} source={{uri: selectedImage}} />
          ) : (
            <AppText fontSize={15} fontWeight={'bold'} textAlign={'center'}>
              Upload Profile Image
            </AppText>
          )}
        </AppView>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Home')}>
        <AppText fontSize={16} marginTop={10} fontWeight={'bold'}>
          SKIP
        </AppText>
      </TouchableOpacity>

      {selectedImage ? (
        <Button
          width={'30%'}
          backgroundColor={'red'}
          text={'upload'}
          marginTop={10}
          borderRadius={5}
          onPress={uploadImage}
        />
      ) : null}
      <Toast visibilityTime={2500} topOffset={10} />
      <Loading visible={loadingProgress} />
    </AppView>
  );
};

export default UploadProfile;
