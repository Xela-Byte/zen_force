import {StyleSheet} from 'react-native';
import {sizeBlock, universalStyle} from './universalStyle';

export const accountSetupStyle = StyleSheet.create({
  wrapper: {
    ...universalStyle.container,
  },
  container: {
    paddingVertical: sizeBlock.getHeightSize(20),
    paddingHorizontal: sizeBlock.getWidthSize(20),
  },
});
