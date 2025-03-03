import {StyleSheet} from 'react-native';
import {
  appColors,
  borderRadius,
  screenWidth,
  sizeBlock,
  universalStyle,
} from './universalStyle';

export const memoryLaneStyle = StyleSheet.create({
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
    height: '100%',
  },
  gameCard: {
    width: screenWidth * 0.75,
    height: sizeBlock.getHeightSize(375),
    borderRadius: borderRadius.medium * 2,
    position: 'relative',
    overflow: 'hidden',
  },
  gameText: {
    padding: sizeBlock.getWidthSize(20),
    ...universalStyle.verticalCentering,
    height: '100%',
  },
  counterCard: {
    borderRadius: borderRadius.medium,
    ...universalStyle.centering,
    columnGap: sizeBlock.getWidthSize(10),
    padding: sizeBlock.getWidthSize(10),
    marginVertical: sizeBlock.getHeightSize(50),
    backgroundColor: appColors.card,
    width: sizeBlock.getWidthSize(150),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
