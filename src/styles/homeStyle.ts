import {StyleSheet} from 'react-native';
import {
  appColors,
  borderRadius,
  sizeBlock,
  universalStyle,
} from './universalStyle';

export const homeStyle = StyleSheet.create({
  wrapper: {
    ...universalStyle.container,
    backgroundColor: appColors.green,
  },
  container: {
    paddingTop: sizeBlock.getHeightSize(50),
    paddingHorizontal: sizeBlock.getWidthSize(20),
  },
  avatar: {
    width: sizeBlock.getWidthSize(55),
    height: sizeBlock.getWidthSize(55),
    borderRadius: borderRadius.full,
  },
  gameContainer: {
    width: '100%',
    padding: sizeBlock.getWidthSize(15),
    borderRadius: borderRadius.medium + 5,
    backgroundColor: appColors.brightGreen,
    marginVertical: sizeBlock.getHeightSize(30),
  },
  partnerCard: {
    backgroundColor: appColors.transGreen,
    borderRadius: borderRadius.medium + 5,
    width: '100%',
    zIndex: 20,
    overflow: 'hidden',
  },
  coupleSection: {
    backgroundColor: appColors.white,
    borderTopLeftRadius: borderRadius.medium + 5,
    borderTopRightRadius: borderRadius.medium + 5,
    marginTop: sizeBlock.getHeightSize(30),
    padding: sizeBlock.getWidthSize(15),
  },
  coupleSectionTabWrapper: {
    paddingVertical: sizeBlock.getHeightSize(20),
    rowGap: sizeBlock.getHeightSize(15),
  },
  coupleSectionTab: {
    borderWidth: 1,
    borderColor: appColors.border,
    padding: sizeBlock.getWidthSize(10),
    ...universalStyle.spaceBetween,
    borderRadius: borderRadius.medium + 5,
  },
});
