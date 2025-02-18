import {View, Text, ScrollView, StatusBar} from 'react-native';
import React from 'react';
import {profileSummaryStyle} from '../../styles/profileSummaryStyle';
import HeaderComponent from '../../components/button/HeaderComponent';
import {ProfileSummaryScreenProps} from '../../types/navigation/AuthNavigationType';
import {
  appColors,
  borderRadius,
  sizeBlock,
  universalStyle,
} from '../../styles/universalStyle';
import AppText from '../../components/text/AppText';
import AppPressable from '../../components/button/AppPressable';
import {personalityInterests} from '../../components/details/StepTwo';
import AppButton from '../../components/button/AppButton';

type Props = {};

const ProfileSummaryScreen = ({navigation}: ProfileSummaryScreenProps) => {
  return (
    <>
      <ScrollView style={profileSummaryStyle.wrapper}>
        <StatusBar backgroundColor={appColors.gray} />
        <HeaderComponent navigation={navigation} title="Profile summary" />

        <View style={profileSummaryStyle.container}>
          <View style={profileSummaryStyle.aboutContainer}>
            <View style={universalStyle.flexBetween}>
              <AppText fontType="medium">About</AppText>
              <AppPressable onPress={() => {}}>
                <AppText color={appColors.border}>Edit</AppText>
              </AppPressable>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText>Name</AppText>
              <AppText>Xela Oladipupo</AppText>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText>Age</AppText>
              <AppText>20</AppText>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText>Gender</AppText>
              <AppText>Male</AppText>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText>Personality</AppText>
              <AppText>Big Five</AppText>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText>Love language</AppText>
              <AppText>Quality time</AppText>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText>Communication preference</AppText>
              <AppText>Quality time</AppText>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText>Attachment style</AppText>
              <AppText>Quality time</AppText>
            </View>
          </View>
          <View style={profileSummaryStyle.aboutContainer}>
            <View style={universalStyle.flexBetween}>
              <AppText fontType="medium">Peronality Interest</AppText>
              <AppPressable onPress={() => {}}>
                <AppText color={appColors.border}>Edit</AppText>
              </AppPressable>
            </View>

            <View
              style={{
                ...universalStyle.flexWrap,
                paddingVertical: sizeBlock.getHeightSize(10),
                gap: sizeBlock.getWidthSize(10),
              }}>
              {personalityInterests.slice(0, 4).map(interest => {
                return (
                  <View key={interest.value}>
                    <View
                      style={{
                        ...universalStyle.verticalCentering,
                        paddingVertical: sizeBlock.getHeightSize(10),
                        paddingHorizontal: sizeBlock.getWidthSize(15),
                        borderRadius: borderRadius.full,
                        columnGap: sizeBlock.getWidthSize(10),
                        backgroundColor: appColors.lightGray,
                      }}>
                      <interest.icon />

                      <AppText color={appColors.text}>{interest.label}</AppText>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          <View style={profileSummaryStyle.aboutContainer}>
            <View style={universalStyle.flexBetween}>
              <AppText fontType="medium">Relationship Info</AppText>
              <AppPressable onPress={() => {}}>
                <AppText color={appColors.border}>Edit</AppText>
              </AppPressable>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText>Relationship stage</AppText>
              <AppText>Newly weds</AppText>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText>Relationship Age</AppText>
              <AppText>2 years</AppText>
            </View>
          </View>
          <View style={profileSummaryStyle.aboutContainer}>
            <View style={universalStyle.flexBetween}>
              <AppText fontType="medium">Relationship Goal</AppText>
              <AppPressable onPress={() => {}}>
                <AppText color={appColors.border}>Edit</AppText>
              </AppPressable>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText>Relationship stage</AppText>
              <AppText>Newly weds</AppText>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText>Relationship Age</AppText>
              <AppText>To build Intimacy</AppText>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={profileSummaryStyle.container}>
        <AppButton
          customViewStyle={{
            position: 'relative',
          }}
          title="Submit"
          bgColor={appColors.green}
          onPress={() => {}}
        />
      </View>
    </>
  );
};

export default ProfileSummaryScreen;
