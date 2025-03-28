import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StatusBar, View} from 'react-native';
import AppButton from '@/components/button/AppButton';
import AppPressable from '@/components/button/AppPressable';
import BackButton from '@/components/button/BackButton';
import AppInput from '@/components/input/AppInput';
import AppText from '@/components/text/AppText';
import {loginStyle} from '@/styles/loginStyle';
import {appColors, fontSize, sizeBlock} from '@/styles/universalStyle';
import {
  AuthStackParamList,
  ForgotPasswordScreenProps,
} from '@/types/navigation/AuthNavigationType';

type Props = {};

interface Inputs {
  email: string;
}

const ForgotPasswordScreen = ({navigation}: ForgotPasswordScreenProps) => {
  const {control} = useForm<Inputs>();

  const navigateTo = (route: keyof AuthStackParamList) => {
    // @ts-ignore
    navigation.navigate(route);
  };
  return (
    <ScrollView style={loginStyle.wrapper}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <BackButton navigation={navigation} />
      <View style={loginStyle.container}>
        <AppText fontSize={fontSize.medium} fontType="medium">
          Forgot Password?
        </AppText>
        <AppText
          color={appColors.textGrey}
          customStyle={{
            marginTop: sizeBlock.getHeightSize(10),
          }}>
          Sign up to get started
        </AppText>

        <AppInput<Inputs>
          control={control}
          name="email"
          placeholder="Enter your email"
          animatedPlaceholder="Email"
          customStyle={{
            marginTop: sizeBlock.getHeightSize(50),
          }}
        />

        <View
          style={{
            marginVertical: sizeBlock.getHeightSize(10),
          }}
        />

        <AppButton
          title="Send Reset Link"
          bgColor={appColors.green}
          onPress={() => {
            navigateTo('CreateNewPasswordScreen');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;
