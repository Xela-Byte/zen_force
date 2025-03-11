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
import AbsoluteOverlay from '../background/AbsoluteOverlay';
import LottieView from 'lottie-react-native';
import {useEffect, useRef, useState} from 'react';
import {questionRouletteStyle} from '../../styles/questionRouletteStyle';

type Props = {
  title: string;
  content: string;
  onDone: () => void;
  onCancel?: () => void;
  type?: 'single' | 'multi';
  confirmBtnTitle?: string;
  showConfetti?: boolean;
};

const PopupComponent = ({
  content,
  onDone,
  title,
  type = 'single',
  confirmBtnTitle = 'Done',
  onCancel,
  showConfetti = false,
}: Props) => {
  const confettiRef = useRef<LottieView>(null);
  const [shouldShowConfetti, setShouldShowConfetti] = useState(showConfetti);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (showConfetti) {
      setShouldShowConfetti(true);
      timeout = setTimeout(() => {
        setShouldShowConfetti(false);
      }, 1500);
    }

    return () => clearTimeout(timeout);
  }, [showConfetti]);

  return (
    <AbsoluteOverlay>
      <>
        {type === 'single' && (
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
                title={confirmBtnTitle}
                bgColor={appColors.green}
                customViewStyle={{
                  width: screenWidth * 0.8,
                  marginTop: sizeBlock.getHeightSize(10),
                }}
              />
            </Animated.View>
          </View>
        )}

        {type === 'multi' && (
          <View style={styles.container}>
            <BlurView style={styles.container} />
            <Animated.View animation={'rubberBand'} style={styles.content}>
              <AppText
                fontType="medium"
                color={appColors.black}
                customStyle={{textAlign: 'center'}}>
                {title}
              </AppText>
              <AppText customStyle={{textAlign: 'center'}}>{content}</AppText>

              <View style={{width: '100%'}}>
                <AppButton
                  onPress={() => {
                    onCancel?.();
                  }}
                  title={'Cancel'}
                  bgColor={appColors.green}
                  buttonType="outlined"
                  customViewStyle={{
                    marginTop: sizeBlock.getHeightSize(10),
                  }}
                />
                <AppButton
                  onPress={onDone}
                  title={confirmBtnTitle}
                  bgColor={appColors.green}
                  customViewStyle={{
                    marginTop: sizeBlock.getHeightSize(10),
                  }}
                />
              </View>
            </Animated.View>
          </View>
        )}

        {shouldShowConfetti && (
          <LottieView
            ref={confettiRef}
            source={require('../../animations/confetti.json')}
            autoPlay={true}
            loop={false}
            style={[questionRouletteStyle.lottie, {zIndex: 100}]}
            resizeMode="cover"
          />
        )}
      </>
    </AbsoluteOverlay>
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
