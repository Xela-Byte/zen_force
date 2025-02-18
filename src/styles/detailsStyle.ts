import {StyleSheet} from 'react-native';
import {
  appColors,
  borderRadius,
  screenHeight,
  sizeBlock,
  universalStyle,
} from './universalStyle';

export const detailsStyle = StyleSheet.create({
  wrapper: {
    ...universalStyle.container,
  },
  container: {
    paddingVertical: sizeBlock.getHeightSize(20),
    paddingHorizontal: sizeBlock.getWidthSize(20),
  },
  uploadBtnWrapper: {
    ...universalStyle.verticalCentering,
    columnGap: sizeBlock.getWidthSize(15),
  },
  slideWrapper: {
    ...universalStyle.spaceBetween,
    paddingBottom: sizeBlock.getHeightSize(15),
  },
  slideStyle: {
    width: '18%',
    height: sizeBlock.getHeightSize(5),
    backgroundColor: appColors.grey,
    borderRadius: borderRadius.full,
  },
  activeSlideStyle: {
    width: '18%',
    height: sizeBlock.getHeightSize(5),
    backgroundColor: appColors.green,
    borderRadius: borderRadius.full,
  },
});
