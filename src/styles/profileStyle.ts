import {StyleSheet} from 'react-native';
import {
  appColors,
  borderRadius,
  sizeBlock,
  universalStyle,
} from './universalStyle';

export const profileStyle = StyleSheet.create({
  wrapper: {
    ...universalStyle.container,
    backgroundColor: appColors.green,
  },
  container: {
    paddingVertical: sizeBlock.getHeightSize(20),
    paddingHorizontal: sizeBlock.getWidthSize(20),
    borderTopLeftRadius: borderRadius.medium,
    borderTopRightRadius: borderRadius.medium,
    backgroundColor: appColors.white,
    marginTop: sizeBlock.getHeightSize(20),
    height: '100%',
  },
  avatarContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
    width: sizeBlock.getWidthSize(100),
    height: sizeBlock.getWidthSize(100),
  },
  editIcon: {
    position: 'absolute',
    width: sizeBlock.getWidthSize(25),
    height: sizeBlock.getWidthSize(25),
    borderRadius: borderRadius.full,
    right: 0,
    top: 5,
    backgroundColor: '#E6E5E3',
    zIndex: 9,
    ...universalStyle.centering,
  },
  tabContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: sizeBlock.getHeightSize(30),
    rowGap: sizeBlock.getHeightSize(10),
  },
  tab: {
    borderWidth: 1,
    borderColor: appColors.grey,
    padding: sizeBlock.getWidthSize(15),
    borderRadius: borderRadius.medium,
    ...universalStyle.verticalCentering,
    columnGap: sizeBlock.getWidthSize(10),
  },
});
