import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBox: {
    // backgroundColor: 'red',
    height: 130,
    width: 130,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
  },
});

export default styles;
