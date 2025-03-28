import {StyleSheet} from 'react-native';
import {sizeBlock, universalStyle} from './universalStyle';

export const accountSetupStyle = StyleSheet.create({
  wrapper: {
    ...universalStyle.container,
    height: '85%',
  },
  container: {
    padding: sizeBlock.getWidthSize(20),
  },
});
