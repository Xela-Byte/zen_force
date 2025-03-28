import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, StatusBar} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import AppImage from '@/components/image/AppImage';
import {onboardingStyle} from '@/styles/onboardingStyle';
import HeartSign from '@/assets/svgsComponents/HeartSign';
import AppText from '@/components/text/AppText';
import {appColors, fontSize, sizeBlock} from '@/styles/universalStyle';
import AppButton from '@/components/button/AppButton';
import ArrowSlantUp from '@/assets/svgsComponents/ArrowSlantUp';
import {
  AuthStackParamList,
  OnboardingScreenProps,
} from '@/types/navigation/AuthNavigationType';
import AppPressable from '@/components/button/AppPressable';
import {useAppDispatch, useAppSelector} from '@/hooks/helpers/useRedux';
import {markInstalled} from '@/store/slices/appSlice';

interface Item {
  key: string;
  title: string;
  text: string;
}

const slides: Item[] = [
  {
    key: '1',
    title: 'Inclusive, reliable, safe',
    text: 'Go beyond your social circle & connect with people near and far',
  },
  {
    key: '2',
    title: 'Improve your relationship',
    text: 'Go beyond your social circle & connect with people near and far',
  },
  {
    key: '3',
    title: 'Inclusive, reliable, safe',
    text: 'Go beyond your social circle & connect with people near and far',
  },
];

const renderItem = ({item}: {item: Item}) => {
  return (
    <View style={onboardingStyle.slide}>
      <HeartSign />
      <AppText
        fontSize={fontSize.medium}
        customStyle={{
          textAlign: 'center',
        }}
        fontType="medium">
        {item.title}
      </AppText>
      <AppText
        fontSize={sizeBlock.fontSize(14)}
        fontType="regular"
        customStyle={{
          textAlign: 'center',
          marginTop: sizeBlock.getHeightSize(10),
        }}>
        {item.text}
      </AppText>
    </View>
  );
};

const OnboardingScreen = ({navigation}: OnboardingScreenProps) => {
  const navigateTo = (route: keyof AuthStackParamList) => {
    // @ts-ignore
    navigation.navigate(route);
  };

  const dispatch = useAppDispatch();
  const isNewInstall = useAppSelector(state => state.app.isNewInstall);

  const inviteNewUser = useCallback(() => {
    if (isNewInstall) {
      console.log('🚀 First time install detected!');
      dispatch(markInstalled());
    }
  }, [isNewInstall, dispatch]);

  return (
    <View style={onboardingStyle.wrapper}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <View
        style={{
          height: '75%',
        }}>
        <AppIntroSlider
          data={slides}
          dotStyle={onboardingStyle.dotStyle}
          activeDotStyle={onboardingStyle.activeDotStyle}
          renderItem={renderItem}
          onDone={() => {
            inviteNewUser();
          }}
          showSkipButton={false} // Hide the skip button
          showNextButton={false} // Hide the next button
        />
      </View>

      <View
        style={{
          height: '25%',
          paddingHorizontal: sizeBlock.getWidthSize(20),
          paddingVertical: sizeBlock.getHeightSize(20),
        }}>
        <AppButton
          title="Get started"
          onPress={() => {
            inviteNewUser();
            navigateTo('RegisterScreen');
          }}
          icon={<ArrowSlantUp />}
        />

        <AppPressable
          onPress={() => {
            inviteNewUser();
            navigateTo('LoginScreen');
          }}>
          <AppText
            fontType="medium"
            customStyle={{
              textAlign: 'center',
              marginTop: sizeBlock.getHeightSize(20),
            }}>
            Already have an account?{'  '}
            <AppText fontType="medium" color={appColors.green}>
              Login
            </AppText>
          </AppText>
        </AppPressable>
      </View>
    </View>
  );
};

export default OnboardingScreen;
