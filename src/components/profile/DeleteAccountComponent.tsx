import React, {useState} from 'react';
import {View} from 'react-native';
import ClockIcon from '../../assets/profileIcons/clock.svg';
import ArrowLeft from '../../assets/svgsComponents/ArrowLeft';
import {profileStyle} from '../../styles/profileStyle';
import {sizeBlock} from '../../styles/universalStyle';
import AppPressable from '../button/AppPressable';
import AppText from '../text/AppText';
import PopupComponent from '../popup/PopupComponent';

type Props = {};

const DeleteAccountComponent = (props: Props) => {
  const [showBottomTab, setShowBottomTab] = useState(false);

  return (
    <>
      <AppPressable
        customViewStyle={{
          marginTop: sizeBlock.getHeightSize(40),
        }}
        onPress={() => {
          setShowBottomTab(true);
        }}>
        <View style={profileStyle.tab}>
          <ClockIcon />
          <AppText>Delete Account</AppText>
          <ArrowLeft
            style={{
              transform: [{rotate: '180deg'}],
              marginLeft: 'auto',
              // transform: [{rotate: '90deg'}],
            }}
          />
        </View>
      </AppPressable>

      {showBottomTab && (
        <PopupComponent
          type="multi"
          title="Delete Account"
          onDone={() => {}}
          confirmBtnTitle="Delete"
          onCancel={() => {
            setShowBottomTab(false);
          }}
          content="Are you sure you want to delete your account. You will loose everything"
        />
      )}
    </>
  );
};

export default DeleteAccountComponent;
