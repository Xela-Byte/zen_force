import {StyleSheet} from 'react-native';
import {
  appColors,
  borderRadius,
  fontFamily,
  sizeBlock,
  universalStyle,
} from './universalStyle';
import useHexToRGBA from '../hooks/helpers/useHexToRGBA';

export const aiCounselorStyle = StyleSheet.create({
  wrapper: {
    ...universalStyle.container,
    backgroundColor: appColors.white,
  },
  header: {
    backgroundColor: appColors.green,
    borderBottomLeftRadius: borderRadius.medium + 10,
    borderBottomRightRadius: borderRadius.medium + 10,
    paddingVertical: sizeBlock.getHeightSize(10),
  },
  messageInputWrapper: {
    ...universalStyle.spaceBetween,
    width: '100%',
    height: sizeBlock.getHeightSize(100),
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: sizeBlock.getWidthSize(20),
    columnGap: sizeBlock.getWidthSize(20),
  },
  messageInputContainer: {
    width: '85%',
    borderRadius: borderRadius.medium * 2,
    backgroundColor: appColors.input,
    elevation: 10,
    shadowColor: useHexToRGBA('#000000', 0.5),
    shadowOffset: {
      width: 5,
      height: 4,
    },
  },
  inputContainer: {
    paddingHorizontal: sizeBlock.getWidthSize(15),
    paddingVertical: sizeBlock.getHeightSize(5),
    ...universalStyle.spaceBetween,
  },
  input: {
    fontFamily: fontFamily.regular,
    width: '85%',
    color: appColors.black,
  },
});
