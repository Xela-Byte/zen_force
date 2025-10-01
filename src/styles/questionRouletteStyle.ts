import {StyleSheet} from 'react-native';
import {
  appColors,
  borderRadius,
  screenHeight,
  sizeBlock,
  universalStyle,
} from './universalStyle';
import useHexToRGBA from '../hooks/helpers/useHexToRGBA';

export const questionRouletteStyle = StyleSheet.create({
  wrapper: {
    ...universalStyle.container,
    backgroundColor: appColors.green,
    paddingTop: sizeBlock.getHeightSize(10),
  },
  container: {
    paddingTop: sizeBlock.getHeightSize(20),
    paddingBottom: sizeBlock.getHeightSize(40),
    paddingHorizontal: sizeBlock.getWidthSize(20),
    borderTopLeftRadius: borderRadius.medium * 2,
    borderTopRightRadius: borderRadius.medium * 2,
    backgroundColor: appColors.white,
    marginTop: sizeBlock.getHeightSize(20),
  },
  gameTabWrapper: {
    paddingTop: sizeBlock.getHeightSize(15),
    rowGap: sizeBlock.getHeightSize(20),
  },
  gameTab: {
    width: '100%',
    height: sizeBlock.getHeightSize(120),
    position: 'relative',
    borderRadius: borderRadius.medium + 5,
    marginVertical: sizeBlock.getHeightSize(10),
  },
  gameTabCard: {
    position: 'absolute',
    backgroundColor: useHexToRGBA(appColors.white, 0.7),
    borderRadius: borderRadius.small,
    bottom: sizeBlock.getHeightSize(10),
    left: sizeBlock.getWidthSize(10),
    padding: sizeBlock.getWidthSize(10),
    flexDirection: 'column',
    rowGap: sizeBlock.getHeightSize(5),
  },
  gameTabTag: {
    position: 'absolute',
    borderRadius: borderRadius.medium + 5,
    borderTopRightRadius: 0,
    bottom: 0,
    right: 0,
    height: sizeBlock.getHeightSize(40),
    ...universalStyle.centering,
  },
  questionCard: {
    width: '100%',
    backgroundColor: appColors.limeGreen,
    height: sizeBlock.getHeightSize(175),
    marginVertical: sizeBlock.getHeightSize(25),
    borderRadius: borderRadius.medium * 2,
    position: 'relative',
  },
  lottie: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
});
