import {StyleSheet} from 'react-native';
import {
  appColors,
  borderRadius,
  sizeBlock,
  universalStyle,
} from './universalStyle';

export const profileSummaryStyle = StyleSheet.create({
  wrapper: {
    ...universalStyle.container,
    backgroundColor: appColors.gray,
  },
  container: {
    paddingVertical: sizeBlock.getHeightSize(20),
    rowGap: sizeBlock.getHeightSize(20),
    paddingHorizontal: sizeBlock.getWidthSize(20),
  },
  aboutContainer: {
    backgroundColor: appColors.white,
    borderRadius: borderRadius.medium,
    padding: sizeBlock.getWidthSize(20),
    rowGap: sizeBlock.getHeightSize(10),
  },
});
