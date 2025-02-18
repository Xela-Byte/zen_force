import React, {useEffect, useRef, useState} from 'react';
import {Animated, StatusBar, StyleSheet, View} from 'react-native';
import AppLogo from '../../assets/images/logo.png';
import {
  appColors,
  screenWidth,
  sizeBlock,
  universalStyle,
} from '../../styles/universalStyle';
import AppImage from '../image/AppImage';

export function WithSplashScreen({
  children,
  isAppReady,
}: {
  isAppReady: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      {isAppReady ? children : null}
      <Splash isAppReady={isAppReady} />
    </>
  );
}

const WAIT_FOR_APP_TO_BE_READY = 'Wait for app to be ready';
const FADE_OUT = 'Fade out';
const HIDDEN = 'Hidden';

export const Splash = ({isAppReady}: {isAppReady: boolean}) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;

  const [state, setState] = useState<
    typeof WAIT_FOR_APP_TO_BE_READY | typeof FADE_OUT | typeof HIDDEN
  >(WAIT_FOR_APP_TO_BE_READY);

  useEffect(() => {
    if (state === WAIT_FOR_APP_TO_BE_READY) {
      if (isAppReady) {
        setState(FADE_OUT);
      }
    }
  }, [isAppReady, state]);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setState(HIDDEN);
    }, 2500);

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [state]);

  return (
    <Animated.View
      collapsable={false}
      style={[
        style.container,
        {
          opacity: containerOpacity,
          display: state === HIDDEN ? 'none' : 'flex',
        },
      ]}>
      <StatusBar backgroundColor={appColors.black} barStyle={'light-content'} />
      <View style={style.subContainer}>
        <AppImage
          source={AppLogo}
          style={{
            width: sizeBlock.getWidthSize(210),
            height: sizeBlock.getWidthSize(210),
          }}
        />
      </View>
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: appColors.black,
  },
  subContainer: {
    width: '100%',
    height: '100%',
    ...universalStyle.centering,
    flexDirection: 'column',
  },
  lightContainer: {
    position: 'absolute',
    top: -sizeBlock.getHeightSize(45),
    left: sizeBlock.getWidthSize(20),
  },
  logo: {
    width: screenWidth / 1.5,
    height: screenWidth / 1.5,
  },
});
