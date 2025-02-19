import React, {useState} from 'react';
import {View} from 'react-native';
import EarthIcon from '../../assets/profileIcons/earth.svg';
import ArrowLeft from '../../assets/svgsComponents/ArrowLeft';
import AppPressable from '../../components/button/AppPressable';
import AppText from '../../components/text/AppText';
import {profileStyle} from '../../styles/profileStyle';
import AbsoluteOverlay from '../background/AbsoluteOverlay';
import PlanSelection from './PlanSelection';

type Props = {};

const PlanComponent = (props: Props) => {
  const [showBottomTab, setShowBottomTab] = useState(false);

  return (
    <>
      <AppPressable
        onPress={() => {
          setShowBottomTab(true);
        }}>
        <View style={profileStyle.tab}>
          <EarthIcon />
          <AppText>Plan: Free</AppText>
          <ArrowLeft
            style={{
              transform: [{rotate: showBottomTab ? '90deg' : '180deg'}],
              marginLeft: 'auto',
            }}
          />
        </View>
      </AppPressable>

      {showBottomTab && (
        <AbsoluteOverlay>
          <PlanSelection
            setShowBottomTab={setShowBottomTab}
            showBottomTab={showBottomTab}
          />
        </AbsoluteOverlay>
      )}
    </>
  );
};

export default PlanComponent;
