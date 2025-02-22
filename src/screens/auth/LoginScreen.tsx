import React from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StatusBar, View} from 'react-native';
import AppButton from '../../components/button/AppButton';
import AppPressable from '../../components/button/AppPressable';
import BackButton from '../../components/button/BackButton';
import AppInput from '../../components/input/AppInput';
import AppText from '../../components/text/AppText';
import {loginStyle} from '../../styles/loginStyle';
import {appColors, fontSize, sizeBlock} from '../../styles/universalStyle';
import {
  AuthStackParamList,
  LoginScreenProps,
} from '../../types/navigation/AuthNavigationType';

type Props = {};

interface Inputs {
  email: string;
  password: string;
}

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const {control} = useForm<Inputs>();

  const navigateTo = <T extends keyof AuthStackParamList>(
    route: T,
    params?: AuthStackParamList[T], // params is optional and should match the screen's expected params
  ) => {
    // @ts-ignore
    navigation.navigate(route, params);
  };

  return (
    <ScrollView style={loginStyle.wrapper}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <BackButton navigation={navigation} />
      <View style={loginStyle.container}>
        <AppText fontSize={fontSize.medium} fontType="medium">
          Welcome Back!
        </AppText>
        <AppText
          color={appColors.textGrey}
          customStyle={{
            marginTop: sizeBlock.getHeightSize(10),
          }}>
          We missed you, sign in to your account
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

        <AppInput<Inputs>
          control={control}
          name="password"
          placeholder="Enter your password"
          animatedPlaceholder="Password"
          password
          customStyle={{
            marginTop: sizeBlock.getHeightSize(10),
          }}
        />

        <AppPressable
          customViewStyle={{
            display: 'flex',
            alignItems: 'flex-end',
            marginTop: sizeBlock.getHeightSize(5),
            marginBottom: sizeBlock.getHeightSize(25),
          }}
          onPress={() => {
            navigateTo('ForgotPasswordScreen');
          }}>
          <AppText color={appColors.textGrey} fontSize={fontSize.small - 1}>
            Forgot Password
          </AppText>
        </AppPressable>

        <AppButton
          title="Sign in"
          bgColor={appColors.green}
          onPress={() => {}}
        />

        <AppText
          color={appColors.textGrey}
          customStyle={{
            textAlign: 'center',
            marginVertical: sizeBlock.getHeightSize(25),
          }}>
          or sign in with
        </AppText>

        <AppButton
          buttonType="outlined"
          title="Sign in with Google"
          iconName="google"
          bgColor={appColors.green}
          onPress={() => {}}
          textColor={appColors.text}
          customViewStyle={{
            marginBottom: sizeBlock.getHeightSize(10),
          }}
        />

        <AppButton
          buttonType="outlined"
          iconName="apple"
          textColor={appColors.text}
          title="Sign in with Apple"
          bgColor={appColors.green}
          onPress={() => {}}
        />

        <AppPressable
          onPress={() => {
            navigateTo('RegisterScreen');
          }}>
          <AppText
            fontType="medium"
            customStyle={{
              textAlign: 'center',
              marginTop: sizeBlock.getHeightSize(20),
            }}>
            Don't have an account?{'  '}
            <AppText fontType="medium" color={appColors.green}>
              Sign up
            </AppText>
          </AppText>
        </AppPressable>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
