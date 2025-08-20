import React from 'react';
import {ScrollView, StatusBar, View, SafeAreaView} from 'react-native';
import EarthIcon from '@/assets/profileIcons/earth.svg';
import LockIcon from '@/assets/profileIcons/lock.svg';
import PersonIcon from '@/assets/profileIcons/profile.svg';
import TimezoneIcon from '@/assets/profileIcons/timezone.svg';
import ArrowLeft from '@/assets/svgsComponents/ArrowLeft';
import AppPressable from '@/components/button/AppPressable';
import HeaderComponent from '@/components/button/HeaderComponent';
import CustomDropdown from '@/components/dropdown/CustomDropdown';
import DeleteAccountComponent from '@/components/profile/DeleteAccountComponent';
import PlanComponent from '@/components/profile/PlanComponent';
import ProfilePicture from '@/components/profile/ProfilePicture';
import AppText from '@/components/text/AppText';
import {useAppDispatch, useAppSelector} from '@/hooks/helpers/useRedux';
import {logout} from '@/store/slices/appSlice';
import {profileStyle} from '@/styles/profileStyle';
import {appColors, sizeBlock} from '@/styles/universalStyle';
import {
  ProfileScreenProps,
  ProfileStackParamList,
} from '@/types/navigation/ProfileNavigationType';

const languages = [
  {label: 'Language: English', value: 'english'},
  {label: 'Language: French', value: 'français'},
  {label: 'Language: Spanish', value: 'español'},
  {label: 'Language: German', value: 'deutsch'},
  {label: 'Language: Italian', value: 'italiano'},
  {label: 'Language: Portuguese', value: 'português'},
];

const ProfileScreen = ({navigation}: ProfileScreenProps) => {
  const dispatch = useAppDispatch();

  const navigateTo = <T extends keyof ProfileStackParamList>(
    route: T,
    params?: ProfileStackParamList[T],
  ) => {
    // @ts-ignore
    navigation.navigate(route, params);
  };

  const user = useAppSelector(state => state.app.user);
  const userData = user?.userInfo;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={profileStyle.wrapper}>
      <StatusBar backgroundColor={appColors.green} barStyle={'light-content'} />
      <ScrollView style={profileStyle.wrapper}>
        <HeaderComponent
          theme={'light'}
          navigation={navigation}
          title="Profile"
        />

        <View style={profileStyle.container}>
          <ProfilePicture />
          <View style={profileStyle.tabContainer}>
            <AppPressable
              onPress={() => {
                navigateTo('ProfileSummaryScreen');
              }}>
              <View style={profileStyle.tab}>
                <PersonIcon />
                <AppText>Account Information</AppText>
                <ArrowLeft
                  style={{
                    transform: [{rotate: '180deg'}],
                    marginLeft: 'auto',
                  }}
                />
              </View>
            </AppPressable>

            <AppPressable
              onPress={() => {
                navigateTo('CreateNewPasswordScreen');
              }}>
              <View style={profileStyle.tab}>
                <LockIcon />
                <AppText>Password</AppText>
                <ArrowLeft
                  style={{
                    transform: [{rotate: '180deg'}],
                    marginLeft: 'auto',
                    // transform: [{rotate: '90deg'}],
                  }}
                />
              </View>
            </AppPressable>

            <CustomDropdown
              data={languages}
              placeholder={'Language: English'}
              defaultValue="english"
              onSelect={value => console.log('Selected:', value)}
              leftIcon={
                <EarthIcon style={{marginRight: sizeBlock.getWidthSize(10)}} />
              }
            />

            <AppPressable onPress={() => {}}>
              <View style={profileStyle.tab}>
                <TimezoneIcon />
                <AppText>Time zone: CAT (+1:00)</AppText>
                <ArrowLeft
                  style={{
                    transform: [{rotate: '180deg'}],
                    marginLeft: 'auto',
                    // transform: [{rotate: '90deg'}],
                  }}
                />
              </View>
            </AppPressable>

            <PlanComponent />

            <AppPressable onPress={handleLogout}>
              <View style={profileStyle.tab}>
                <ArrowLeft
                  style={{
                    transform: [{rotate: '180deg'}],
                    marginRight: sizeBlock.getWidthSize(10),
                  }}
                />
                <AppText>Log Out</AppText>
                <ArrowLeft
                  style={{
                    transform: [{rotate: '180deg'}],
                    marginLeft: 'auto',
                  }}
                />
              </View>
            </AppPressable>

            <DeleteAccountComponent />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
