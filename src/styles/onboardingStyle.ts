import {StyleSheet} from 'react-native';
import {
  appColors,
  borderRadius,
  sizeBlock,
  universalStyle,
} from './universalStyle';

export const onboardingStyle = StyleSheet.create({
  wrapper: {
    ...universalStyle.container,
    backgroundColor: appColors.white,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: sizeBlock.getWidthSize(30),
  },
  image: {
    width: sizeBlock.getWidthSize(250),
    height: sizeBlock.getWidthSize(250),
    marginTop: sizeBlock.getHeightSize(30),
  },
  dotStyle: {
    width: sizeBlock.getWidthSize(10),
    height: sizeBlock.getWidthSize(10),
    borderRadius: borderRadius.full,
    marginTop: sizeBlock.getHeightSize(50),
    backgroundColor: appColors.grey,
  },
  activeDotStyle: {
    width: sizeBlock.getWidthSize(10),
    height: sizeBlock.getWidthSize(10),
    borderRadius: borderRadius.full,
    marginTop: sizeBlock.getHeightSize(50),
    backgroundColor: appColors.green,
  },
});
