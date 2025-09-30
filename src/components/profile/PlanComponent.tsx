import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import EarthIcon from '@/assets/profileIcons/earth.svg';
import ArrowLeft from '@/assets/svgsComponents/ArrowLeft';
import AppPressable from '@/components/button/AppPressable';
import AppText from '@/components/text/AppText';
import {profileStyle} from '@/styles/profileStyle';
import AbsoluteOverlay from '../background/AbsoluteOverlay';
import PlanSelection from './PlanSelection';
import {useAppSelector} from '@/hooks/helpers/useRedux';
import {SUBSCRIPTION_PLANS} from '@/types/subscription';
import SubscriptionListener from './SubscriptionListener';

type Props = {};

const PlanComponent = (props: Props) => {
  const [showBottomTab, setShowBottomTab] = useState(false);
  const user = useAppSelector(state => state.app.user);
  const userTier = user?.userInfo?.subscription?.tier || 'basic';
  const userPlan = SUBSCRIPTION_PLANS[userTier];
  const token = useMemo(() => user?.accessToken || '', [user?.accessToken]);

  // Format plan name to show "Basic (Free)" for basic tier
  const getPlanDisplayName = () => {
    if (userTier === 'basic') {
      return 'Basic (Free)';
    }
    return userPlan.name;
  };

  return (
    <>
      {!!token && <SubscriptionListener token={token} />}
      <AppPressable
        onPress={() => {
          setShowBottomTab(true);
        }}>
        <View style={profileStyle.tab}>
          <EarthIcon />
          <AppText>Plan: {getPlanDisplayName()}</AppText>
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
