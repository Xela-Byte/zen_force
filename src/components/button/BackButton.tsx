import {Pressable, StyleSheet} from 'react-native';
import ArrowLeft from '@/assets/svgsComponents/ArrowLeft';
import {sizeBlock, universalStyle} from '@/styles/universalStyle';

type Props = {
  navigation: any;
  onPress?: () => void;
};

const BackButton = ({navigation, onPress}: Props) => {
  return (
    <Pressable
      onPress={onPress ? onPress : navigation.goBack}
      style={style.container}>
      <ArrowLeft />
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    width: sizeBlock.getWidthSize(45),
    height: sizeBlock.getWidthSize(45),
    ...universalStyle.centering,
  },
});

export default BackButton;
