import {StyleSheet} from 'react-native';
import {borderRadius, sizeBlock, universalStyle} from './universalStyle';

export const viewPartnerStyle = StyleSheet.create({
  wrapper: {
    ...universalStyle.container,
  },
  container: {
    paddingVertical: sizeBlock.getHeightSize(20),
    paddingHorizontal: sizeBlock.getWidthSize(20),
  },
  partnerTab: {
    ...universalStyle.centering,
    columnGap: sizeBlock.getWidthSize(20),
    marginTop: sizeBlock.getHeightSize(40),
  },
  partnerAvatar: {
    backgroundColor: '#CFE0C5',
    borderRadius: borderRadius.full,
    width: sizeBlock.getWidthSize(105),
    height: sizeBlock.getWidthSize(105),
    ...universalStyle.centering,
  },
});
