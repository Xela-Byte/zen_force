import React, {useMemo} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import AppButton from '../../components/button/AppButton';
import AppPressable from '../../components/button/AppPressable';
import HeaderComponent from '../../components/button/HeaderComponent';
import {personalityInterests} from '../../components/details/StepTwo';
import AppText from '../../components/text/AppText';
import {profileSummaryStyle} from '../../styles/profileSummaryStyle';
import {
  appColors,
  borderRadius,
  sizeBlock,
  universalStyle,
} from '../../styles/universalStyle';
import {ProfileSummaryScreenProps} from '../../types/navigation/AuthNavigationType';
import {useAppDispatch, useAppSelector} from '../../hooks/helpers/useRedux';
import {setCurrentVettingStep} from '../../store/slices/appSlice';

const ProfileSummaryScreen = ({navigation}: ProfileSummaryScreenProps) => {
  const dispatch = useAppDispatch();
  const vettingData = useAppSelector(state => state.app.vettingData);

  const selectedInterests = useMemo(() => {
    if (!vettingData?.interest) return [];
    if (vettingData?.interest.length === 0) return [];

    let filteredInterests = personalityInterests.filter(({label}) =>
      vettingData?.interest?.some(term =>
        label.toLowerCase().includes(term.toLowerCase()),
      ),
    );

    return filteredInterests || [];
  }, [vettingData?.interest]);

  const handleEdit = (step: number) => {
    dispatch(setCurrentVettingStep(step));
    navigation.goBack();
  };

  return (
    <>
      <ScrollView style={profileSummaryStyle.wrapper}>
        <StatusBar backgroundColor={appColors.gray} />
        <HeaderComponent
          navigation={navigation}
          title="Profile summary"
          onPress={() => {
            handleEdit(4);
          }}
        />

        <View style={profileSummaryStyle.container}>
          <View style={profileSummaryStyle.aboutContainer}>
            <View style={universalStyle.flexBetween}>
              <AppText fontType="medium">About</AppText>
              <AppPressable
                onPress={() => {
                  handleEdit(0);
                }}>
                <AppText color={appColors.border}>Edit</AppText>
              </AppPressable>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText numLine={1}>Name</AppText>
              <View
                style={{
                  width: '50%',
                  alignItems: 'flex-end',
                }}>
                <AppText numLine={1} ellipsizeMode="tail">
                  {vettingData?.fullName ?? 'Zen User'}
                </AppText>
              </View>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText>Age</AppText>
              <AppText numLine={1} ellipsizeMode="tail">
                {vettingData?.age ?? '18'}
              </AppText>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText>Gender</AppText>
              <AppText
                customStyle={{
                  textTransform: 'capitalize',
                }}>
                {vettingData?.gender ?? 'Zen'}
              </AppText>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText>Personality</AppText>
              <AppText>{vettingData?.personalityInsight}</AppText>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText>Love language</AppText>
              <View
                style={{
                  width: '50%',
                  alignItems: 'flex-end',
                }}>
                <AppText numLine={1} ellipsizeMode="tail">
                  {vettingData?.loveLanguage}
                </AppText>
              </View>
            </View>
            {/* <View style={universalStyle.flexBetween}>
              <AppText>Communication preference</AppText>
              <View
                style={{
                  width: '30%',
                  alignItems: 'flex-end',
                }}>
                <AppText numLine={1} ellipsizeMode="tail">
                  Quality time
                </AppText>
              </View>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText>Attachment style</AppText>
              <View
                style={{
                  width: '50%',
                  alignItems: 'flex-end',
                }}>
                <AppText numLine={1} ellipsizeMode="tail">
                  Quality time
                </AppText>
              </View>
            </View> */}
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
              {selectedInterests.map(interest => {
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
              <AppText>Relationship Stage</AppText>
              <AppText>{vettingData?.relationshipStage}</AppText>
            </View>
            <View style={universalStyle.flexBetween}>
              <AppText>Relationship Age</AppText>
              <AppText customStyle={{textTransform: 'capitalize'}}>
                {vettingData?.relationshipDuration}
              </AppText>
            </View>

            <View style={universalStyle.flexBetween}>
              <AppText>Relationship Desire</AppText>
              <View
                style={{
                  width: '50%',
                  alignItems: 'flex-end',
                }}>
                <AppText
                  numLine={1}
                  ellipsizeMode="tail"
                  customStyle={{textTransform: 'capitalize'}}>
                  {vettingData?.relationshipDesire}
                </AppText>
              </View>
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
              <AppText>Relationship goal</AppText>
              <View
                style={{
                  width: '50%',
                  alignItems: 'flex-end',
                }}>
                <AppText numLine={1} ellipsizeMode="tail">
                  {vettingData?.relationshipGoal}
                </AppText>
              </View>
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
