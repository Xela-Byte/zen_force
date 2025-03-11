import {StyleSheet} from 'react-native';
import {
  appColors,
  borderRadius,
  sizeBlock,
  universalStyle,
} from './universalStyle';

export const choosePlanStyle = StyleSheet.create({
  wrapper: {
    ...universalStyle.container,
  },
  container: {
    paddingVertical: sizeBlock.getHeightSize(20),
    paddingHorizontal: sizeBlock.getWidthSize(20),
    width: '100%',
  },
  radioBtnContainer: {
    width: '100%',
    borderWidth: 1,
    position: 'relative',
    padding: sizeBlock.getWidthSize(15),
    borderRadius: borderRadius.small,
    gap: sizeBlock.getHeightSize(5),
  },
  radioBtn: {
    width: sizeBlock.getWidthSize(20),
    height: sizeBlock.getWidthSize(20),
    borderRadius: borderRadius.full,
    borderWidth: 5,
    borderColor: appColors.green,
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
