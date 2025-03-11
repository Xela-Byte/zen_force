import {StyleSheet} from 'react-native';
import {sizeBlock, universalStyle} from './universalStyle';

export const loginStyle = StyleSheet.create({
  wrapper: {
    ...universalStyle.container,
    backgroundColor: 'white',
  },
  container: {
    paddingVertical: sizeBlock.getHeightSize(20),
    paddingHorizontal: sizeBlock.getWidthSize(20),
  },
});
