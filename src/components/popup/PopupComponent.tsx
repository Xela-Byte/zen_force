import {BlurView} from '@react-native-community/blur';
import {StyleSheet, View} from 'react-native';
import {
  appColors,
  borderRadius,
  screenWidth,
  sizeBlock,
  universalStyle,
} from '../../styles/universalStyle';
import AppText from '../text/AppText';
import AppButton from '../button/AppButton';
import CheckMarkIcon from '../../assets/images/circle-checkmark.svg';
import * as Animated from 'react-native-animatable';

type Props = {
  title: string;
  content: string;
  onDone: () => void;
};

const PopupComponent = ({content, onDone, title}: Props) => {
  return (
    <View style={styles.container}>
      <BlurView style={styles.container} />
      <Animated.View animation={'rubberBand'} style={styles.content}>
        <CheckMarkIcon />
        <AppText
          fontType="medium"
          color={'#14AE5C'}
          customStyle={{textAlign: 'center'}}>
          {title}
        </AppText>
        <AppText customStyle={{textAlign: 'center'}}>{content}</AppText>

        <AppButton
          onPress={onDone}
          title="Done"
          bgColor={appColors.green}
          customViewStyle={{
            width: screenWidth * 0.8,
            marginTop: sizeBlock.getHeightSize(10),
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 90,
    ...universalStyle.centering,
    flex: 1,
    padding: sizeBlock.getWidthSize(20),
  },
  content: {
    width: '100%',
    backgroundColor: appColors.white,
    position: 'absolute',
    zIndex: 90,
    padding: sizeBlock.getWidthSize(20),
    borderRadius: borderRadius.medium,
    ...universalStyle.centering,
    flexDirection: 'column',
    rowGap: sizeBlock.getHeightSize(10),
  },
});

export default PopupComponent;
