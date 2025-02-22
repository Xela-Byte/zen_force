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
  RegisterScreenProps,
} from '../../types/navigation/AuthNavigationType';

type Props = {};

interface Inputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen = ({navigation}: RegisterScreenProps) => {
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
          Create Account
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

        <AppInput<Inputs>
          control={control}
          name="confirmPassword"
          placeholder="Confirm your password"
          animatedPlaceholder="Confirm Password"
          password
          customStyle={{
            marginTop: sizeBlock.getHeightSize(10),
          }}
        />

        <View
          style={{
            marginVertical: sizeBlock.getHeightSize(10),
          }}
        />

        <AppButton
          title="Sign up"
          bgColor={appColors.green}
          onPress={() => {
            navigateTo('AccountSetupScreen');
          }}
        />

        <AppText
          color={appColors.textGrey}
          customStyle={{
            textAlign: 'center',
            marginVertical: sizeBlock.getHeightSize(25),
          }}>
          or sign up with
        </AppText>

        <AppButton
          buttonType="outlined"
          title="Sign up with Google"
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
          title="Sign up with Apple"
          bgColor={appColors.green}
          onPress={() => {}}
        />

        <AppPressable
          onPress={() => {
            navigateTo('LoginScreen');
          }}>
          <AppText
            fontType="medium"
            customStyle={{
              textAlign: 'center',
              marginTop: sizeBlock.getHeightSize(20),
            }}>
            Don't have an account?{'  '}
            <AppText fontType="medium" color={appColors.green}>
              Login
            </AppText>
          </AppText>
        </AppPressable>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
