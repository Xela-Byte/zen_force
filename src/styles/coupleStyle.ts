import {StyleSheet} from 'react-native';
import {
  appColors,
  borderRadius,
  sizeBlock,
  universalStyle,
} from './universalStyle';

export const coupleStyle = StyleSheet.create({
  wrapper: {
    ...universalStyle.container,
    backgroundColor: appColors.green,
  },
  container: {
    paddingVertical: sizeBlock.getHeightSize(20),
    paddingHorizontal: sizeBlock.getWidthSize(20),
    borderTopLeftRadius: borderRadius.medium * 2,
    borderTopRightRadius: borderRadius.medium * 2,
    backgroundColor: appColors.white,
    marginTop: sizeBlock.getHeightSize(30),
    height: '100%',
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
