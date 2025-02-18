import {Dimensions, StyleSheet} from 'react-native';
import {sizes} from '../utils/responsiveness/sizeBlock';

export const appColors = {
  black: '#010101',
  white: '#FFFFFF',
  btnBlack: '#121313',
  green: '#3BA700',
  grey: '#D9D9D9',
  lightGreen: '#E6FBC4',
  text: '#121313',
  primary: '#FFFFFF',
  border: '#ABABAB',
  background: '#FFFFFF',
  secondary: '#010101',
  textGrey: '#808080',
  lightCyan: '#E9F1E7',
  gray: '#F7F7F7',
  lightGray: '#EEF3EB',
};

export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;

export const sizeBlock = new sizes(screenHeight, screenWidth);

export const fontFamily = {
  light: 'Fredoka-Light',
  regular: 'Fredoka-Regular',
  medium: 'Fredoka-Medium',
  semiBold: 'Fredoka-SemiBold',
  bold: 'Fredoka-Bold',
};

export const fontSize = {
  small: sizeBlock.fontSize(15),
  medium: sizeBlock.fontSize(25),
  large: sizeBlock.fontSize(50),
};

export const borderRadius = {
  small: 8,
  medium: 15,
  full: 9999,
};

export const universalStyle = StyleSheet.create({
  centering: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  verticalCentering: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: appColors.white,
  },
  flexBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  spaceEvenly: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  spaceBetween: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  flexWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
