import {StyleSheet} from 'react-native';
import {
  appColors,
  borderRadius,
  sizeBlock,
  universalStyle,
} from './universalStyle';

export const coupleChallengeStyle = StyleSheet.create({
  wrapper: {
    ...universalStyle.container,
    backgroundColor: appColors.green,
    paddingTop: sizeBlock.getHeightSize(10),
  },
  container: {
    paddingVertical: sizeBlock.getHeightSize(20),
    paddingHorizontal: sizeBlock.getWidthSize(20),
    borderTopLeftRadius: borderRadius.medium * 2,
    borderTopRightRadius: borderRadius.medium * 2,
    backgroundColor: appColors.white,
    marginTop: sizeBlock.getHeightSize(20),
  },
  challengeTab: {
    width: '47%',
    height: sizeBlock.getHeightSize(230),
    borderRadius: borderRadius.medium + 10,
    position: 'relative',
    overflow: 'hidden',
  },
  challengeCard: {
    padding: sizeBlock.getWidthSize(15),
    position: 'absolute',
    bottom: 0,
  },
  adButton: {
    backgroundColor: appColors.limeGreen,
    marginTop: sizeBlock.getHeightSize(25),
    borderRadius: borderRadius.small + 5,
    paddingHorizontal: sizeBlock.getWidthSize(20),
    paddingVertical: sizeBlock.getHeightSize(25),
    ...universalStyle.spaceBetween,
  },
});
