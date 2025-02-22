import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView, StatusBar, View} from 'react-native';
import AppButton from '../../components/button/AppButton';
import BackButton from '../../components/button/BackButton';
import AppInput from '../../components/input/AppInput';
import AppText from '../../components/text/AppText';
import {loginStyle} from '../../styles/loginStyle';
import {appColors, fontSize, sizeBlock} from '../../styles/universalStyle';
import {
  AuthStackParamList,
  CreateNewPasswordScreenProps,
} from '../../types/navigation/AuthNavigationType';
import PopupComponent from '../../components/popup/PopupComponent';

interface Inputs {
  password: string;
  confirmPassword: string;
}

const CreateNewPasswordScreen = ({
  navigation,
}: CreateNewPasswordScreenProps) => {
  const {control} = useForm<Inputs>();

  const navigateTo = (route: keyof AuthStackParamList) => {
    // @ts-ignore
    navigation.navigate(route);
  };

  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      {showPopup && (
        <PopupComponent
          content="You have successfully updated your password. Click continue to login"
          onDone={() => {
            setShowPopup(false);
          }}
          title="Great Job"
        />
      )}
      <ScrollView style={loginStyle.wrapper}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <BackButton navigation={navigation} />
        <View style={loginStyle.container}>
          <AppText fontSize={fontSize.medium} fontType="medium">
            Create New Password
          </AppText>
          <AppText
            color={appColors.textGrey}
            customStyle={{
              marginTop: sizeBlock.getHeightSize(10),
              marginBottom: sizeBlock.getHeightSize(20),
            }}>
            Fantastic! Let’s get you a new password.
          </AppText>

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
            title="Create New Password"
            bgColor={appColors.green}
            onPress={() => {
              setShowPopup(true);
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default CreateNewPasswordScreen;
